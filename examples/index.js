import express from 'express'
import mongoskin from 'mongoskin'
import bodyParser from 'body-parser'
import debug from 'debug'
import config from 'lib/config'

const log = debug('api-starter:examples')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const db = mongoskin.db(config.mongoUrl, { safe:true })

app.param('collectionName', (req, res, next, collectionName) => {
  req.collection = db.collection(collectionName)
  return next()
})

app.get('/', (req, res) => {
  res.send('please select a collection, e.g., /collections/messages')
})

app.get('/collections/:collectionName', (req, res, next) => {
  req.collection.find({} ,{ limit:10, sort: [['_id',-1]] }).toArray((e, results) => {
    if (e) return next(e)
    res.send(results)
  })
})

app.post('/collections/:collectionName', (req, res, next) => {
  req.collection.insert(req.body, {}, (e, results) => {
    if (e) return next(e)
    res.send(results)
  })
})

app.get('/collections/:collectionName/:id', (req, res, next) => {
  req.collection.findById(req.params.id, (e, result) => {
    if (e) return next(e)
    res.send(result)
  })
})

app.put('/collections/:collectionName/:id', (req, res, next) => {
  req.collection.updateById(req.params.id, { $set:req.body }, { safe:true, multi:false }, (e, result) => {
    if (e) return next(e)
    res.send((1 === result)?{ msg:'success' }:{ msg:'error' })
  })
})

app.delete('/collections/:collectionName/:id', function(req, res, next) {
  req.collection.removeById(req.params.id, function(e, result){
    if (e) return next(e)
    res.send((1 === result)?{ msg:'success' }:{ msg:'error' })
  })
})

let port = 3000

app.listen(port, (err) => {
  if (err) {
    log('Failed to start server: %j', err)
    return err
  }

  log('Server listening at *:%s', port)
  log('Run make test-example in a separate terminal to test out this server')
})
