import request from 'superagent'
import expect from 'expect'
import semver from 'semver-regex'
import pack from 'package'

describe('api-starter rest server', () => {

  it('retrieves api version', (done) => {
    request.get('http://localhost:3000/v1')
      .end((err, res) => {
        expect(err).toBe(null)
        expect(typeof res.body).toBe('object')
        expect(res.body.app).toBe(pack.name)
        expect(res.body.env).toBe(process.env.NODE_ENV)
        expect(res.body.port).toBe(3000)
        expect(typeof res.body.version).toBe('string')
        expect(semver().test(res.body.version)).toBe(true)
        expect(res.body.apiUrl).toBe('/v1')
        done()
    })
  })

  it('fails auth', (done) => {
    request.get('http://localhost:3000/v2/foo')
      .end((err, res) => {
        expect(err).toNotBe(null)
        expect(res).toNotBe(null)
        expect(res.statusCode).toBe(401)
        done()
      })
  })

  it('manages invalid api path', (done) => {
    request.get('http://localhost:3000/foo')
      .end((err, res) => {
        expect(err).toNotBe(null)
        expect(res).toNotBe(null)
        expect(res.statusCode).toBe(404)
        done()
      })
  })
})