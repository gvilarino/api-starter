import express from 'express'
import bodyParser from 'body-parser'
import debug from 'debug'

let log = debug('api-starter:root')
let app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Your custom API should be initialized here
// See examples/index.js for more information

let port = 3000

app.listen(port, (err) => {
  if (err) {
    log('Failed to start server: %j', err)
    return err
  }

  log('Server listening at *:%s', port)
})
