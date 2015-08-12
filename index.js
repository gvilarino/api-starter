import debug from 'debug'
import app from 'lib/boot'

let log = debug('api-starter:root')

let port = 3000

app.listen(port, (err) => {
  if (err) {
    log('Failed to start server: %j', err)
    return err
  }

  log('Server listening at *:%s', port)
})
