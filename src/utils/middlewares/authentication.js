const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET

class Authentication {
  static validateAndExtractDataFromToken(header) {
    try {
      if (!header) throw new Error('Authentication header is missing')

      const [, token] = header.split(' ')

      const { user, role } = jwt.verify(token, jwtSecret)

      if (!user.id || !user.name || !user.username || !role.name) {
        throw new Error('Invalid token')
      }
      const extractedData = {
        user,
        role
      }

      return extractedData
    } catch (error) {
      throw new Error(error.message)
    }
  }

  static verifyRole(roles) {
    return (req, res, next) => {
      try {
        const tokenData = this.validateAndExtractDataFromToken(
          req.headers.authorization
        )

        if (!roles.includes(tokenData.role.name)) {
          throw new Error(
            'Unauthorized role. The following roles are permitted: ' +
              roles.toString()
          )
        }

        req.user = tokenData

        return next()
      } catch (error) {
        res.status(401).json({
          message: error.message
        })
      }
    }
  }
}

module.exports = Authentication
