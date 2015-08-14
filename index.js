'use strict'

import debug from 'debug'
import express from 'express'

// Require separate api versions here
import v1 from 'lib/api-v1'
import v2 from 'lib/api-v2'

let log = debug('api-starter:root')
let port = 3000
let app = express()

// Prepend apis with version path
// define any additional api versions here
app.use('/v1', v1)
app.use('/v2', v2)

app.listen(port, (err) => {
  if (err) {
    log('Failed to start server: %j', err)
    return err
  }

  log('Server listening at *:%s', port)
})
