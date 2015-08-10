/**
* Configuration
*
* - Default config options will be loaded from `/config/defaults.json`. Also it
*   will be used as reference for the Type the values should have.
*
* - Environment specific overrides are optional, using `/config/{NODE_ENV}.json`.
*
* - Environment Variables also can be used to override options (recommended for
*   production).
*   + Variable names should be CONSTANT_CASE.
*     + e.g.: `mongoUrl` => `MONGO_URL`
*     + Scoped variables e.g.: `notifications.url` => `NOTIFICATIONS_URL`
*   + `Arrays`s should be strings separated by commas.
*     + e.g.: `"staff": ["mail@eg.com", "a@c.m"]` => `STAFF="mail@eg.com,a@c.m"`
*   + `Boolean`s should be `true` or `false` as strings.
*     + e.g.: `"rssEnabled": false` => `RSS_ENABLED="false"`
*   + Variable types are casted using `./cast-string.js`
**/

import debug from'debug'
import path from 'path'
import fs from 'fs'
import typeOf from 'component-type'
import changeCase from 'change-case'
import cast from './cast-string'
import crypto from 'crypto'
import normalizeEmail from '../utils'

let log = debug('api-starter:config')
let resolve = path.resolve


let env = process.env
let environment = env.NODE_ENV || 'development'

let configPath = resolve(__dirname, '..', '..', 'config')
let defaultsPath = resolve(configPath, 'defaults.json')
let envPath = resolve(configPath, environment + '.json')

let defaultConfig = require(defaultsPath)
let localConfig = fs.existsSync(envPath) && require(envPath) || {}
let config = {}

forEach(defaultConfig, parse)

function parse(val, key, scope){
  let s = scope ? scope.slice(0) : []
  let c = get(config, s)

  if ('object' === typeOf(val)) {
    c[key] = {}
    forEach(val, parse, s.concat(key))
    return
  }

  let envKey = s.concat(key).map(changeCase.constantCase).join('_')
  if (env.hasOwnProperty(envKey)) {
    let newVal
    try {
      newVal = cast(typeOf(val), env[envKey])
    } catch(e) {
      throw new Error(`There was an error when parsing ENV "${envKey}": ${e}`)
    }
    return c[key] = newVal
  }

  let local = get(localConfig, s)
  if (local && local.hasOwnProperty(key)) {
    let newVal = local[key]
    if (typeOf(val) !== typeOf(newVal)) {
      throw new Error(`Invalid value for key "${key}" on "${environment}.json": should be "${typeOf(val)}"`)
    }
    return c[key] = newVal
  }

  c[key] = val
}

function get(obj, scope) {
  let c = obj
  if (scope) scope.forEach((k) => { c = c ? c[k] : null })
  return c
}

function forEach(obj, cb) {
  let extraArgs = [].slice.call(arguments, 2)
  Object.keys(obj).forEach((key) => {
    let val = obj[key]
    let args = [val, key]
    if (extraArgs.length) args = args.concat(extraArgs)
    cb.apply(obj, args)
  })
}

config.env = environment

if (!config.jwtSecret || config.jwtSecret === defaultConfig.jwtSecret) {
  let token = crypto.randomBytes(32).toString('hex')
  log(`Should set a unique token for your app on the "jwtSecret" configuration key. Here\'s one just for you: "${token}".\n`)
}

config.staff = config.staff.map((email) => {
  return normalizeEmail(email, {
    allowEmailAliases: config.allowEmailAliases
  })
})

module.exports = config
