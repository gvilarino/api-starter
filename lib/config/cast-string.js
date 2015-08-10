var typeOf = require('component-type')

module.exports = cast

function cast(to, string) {
  if ('array' === to) {
    if ('string' !== typeOf(string)) {
      throw new Error('Should be a string of values separated by commas.')
    }
    if ('' === string) return []
    return string.split(',')
  }

  if ('boolean' === to) {
    if ('true' === string) return true
    if ('false' === string) return false
    throw new Error('Should be a boolean written as string.')
  }

  if ('number' === to) {
    var number = parseInt(string, 10)
    if ('number' === typeOf(number)) return number
    throw new Error('Should be a number written as string.')
  }

  if ('string' === to) {
    if ('string' === typeOf(string)) return string
    throw new Error('Should be string.')
  }

  throw new Error('Invalid cast type.')
}
