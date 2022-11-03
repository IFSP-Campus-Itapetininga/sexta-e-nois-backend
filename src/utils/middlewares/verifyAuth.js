const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET

const verifyAuth = (req, res, next) => {
  const authenticationHeader = req.headers.authorization

  if (!authenticationHeader) throw new Error('Authentication header is missing')

  const [, token] = authenticationHeader.split(' ')

  try {
    const { sub: id, name, role } = jwt.verify(token, jwtSecret)

    req.user = {
      id,
      name,
      role
    }

    return next()
  } catch (error) {
    throw new Error('Invalid token')
  }
}

module.exports = { verifyAuth }
