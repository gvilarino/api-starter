/**
 * Basic access restriction middleware
 * for authenticated users.
 */

exports.restrict = function restrict(req, res, next) {
  if (!req.user) return res.sendStatus(401)

  next()
}
