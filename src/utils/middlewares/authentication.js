const jwt = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET

class Authentication {
  static validateAndExtractDataFromToken (header) {
    try {
      if (!header) throw new Error('Authentication header is missing')

      const [, token] = header.split(' ')

      const { userId, userName, roleName } = jwt.verify(token, jwtSecret)

      if (!userId || !userName || !roleName) throw new Error('Invalid token')

      const extractedData = {
        userId,
        userName,
        roleName
      }

      return extractedData
    } catch (error) {
      throw new Error(error.message)
    }
  }

  static verifyRole (roles) {
    return (req, res, next) => {
      try {
        const tokenData = this.validateAndExtractDataFromToken(req.headers.authorization)

        if (!roles.includes(tokenData.roleName)) throw new Error('Unauthorized role. The following roles are permitted: ' + roles.toString())

        req.user = tokenData

        return next()
      } catch (error) {
        throw new Error(error.message)
      }
    }
  }
}

module.exports = Authentication
