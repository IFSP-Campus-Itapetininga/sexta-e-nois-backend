const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET

const verifyAuth = (req, res, next) => {
  const authenticationHeader = req.headers.authorization

  if (!authenticationHeader) throw new Error('Authentication header is missing')

  const [, token] = authenticationHeader.split(' ')

  try {
    const { sub: userId, userName, roleName } = jwt.verify(token, jwtSecret)

    req.user = {
      userId,
      userName,
      roleName
    }

    return next()
  } catch (error) {
    throw new Error('Invalid token')
  }
}

module.exports = { verifyAuth }
