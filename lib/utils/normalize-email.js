import verigy from 'verigy'

module.exports = function normalizeEmail(email, opts) {
  if (!email) return null
  if ('string' !== typeof email) return null

  opts = opts || {}

  if (!opts.allowEmailAliases) email = verigy(email)
  return email.toLowerCase()
}
