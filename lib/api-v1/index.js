/**
 * Module dependencies.
 */
import express from 'express'
import bodyParser from 'body-parser'
import pack from 'package'
import config from 'lib/config'

let app = express()

// Define custom middleware here

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.json(
    {
      app: pack.name,
      env: process.env.NODE_ENV,
      port: config.port,
      version: pack.version,
      apiUrl: '/v1'
    }
  )
})

// Your custom API should be initialized here
// See examples/index.js for more information

export default app
