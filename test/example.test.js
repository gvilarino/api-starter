import superagent from 'superagent'
import expect from 'expect'

describe('express rest api server', () => {
  let id

  it('post object', (done) => {
    superagent.post('http://localhost:3000/collections/test')
      .send({ name: 'John'
        , email: 'john@rpjs.co'
      })
      .end((err, res) => {
        // console.log(res.body)
        expect(err).toBe(null)
        expect(res.body.length).toBe(1)
        expect(res.body[0]._id.length).toBe(24)
        id = res.body[0]._id
        done()
      })
  })

  it('retrieves an object', (done) => {
    superagent.get('http://localhost:3000/collections/test/'+id)
      .end((err, res) => {
        // console.log(res.body)
        expect(err).toBe(null)
        expect(typeof res.body).toBe('object')
        expect(res.body._id.length).toBe(24)
        expect(res.body._id).toBe(id)
        done()
      })
  })

  it('retrieves a collection', (done) => {
    superagent.get('http://localhost:3000/collections/test')
      .end((err, res) => {
        // console.log(res.body)
        expect(err).toBe(null)
        expect(res.body.length).toBeGreaterThan(0)
        expect(res.body.map(function (item){return item._id})).toContain(id)
        done()
      })
  })

  it('updates an object', (done) => {
    superagent.put('http://localhost:3000/collections/test/'+id)
      .send({name: 'Peter'
        , email: 'peter@yahoo.com'})
      .end((err, res) => {
        // console.log(res.body)
        expect(err).toBe(null)
        expect(typeof res.body).toBe('object')
        expect(res.body.msg).toBe('success')
        done()
      })
  })
  it('checks an updated object', (done) => {
    superagent.get('http://localhost:3000/collections/test/'+id)
      .end((err, res) => {
        // console.log(res.body)
        expect(err).toBe(null)
        expect(typeof res.body).toBe('object')
        expect(res.body._id.length).toBe(24)
        expect(res.body._id).toBe(id)
        expect(res.body.name).toBe('Peter')
        done()
      })
  })

  it('removes an object', (done) => {
    superagent.del('http://localhost:3000/collections/test/'+id)
      .end((err, res) => {
        // console.log(res.body)
        expect(err).toBe(null)
        expect(typeof res.body).toBe('object')
        expect(res.body.msg).toBe('success')
        done()
      })
  })
})