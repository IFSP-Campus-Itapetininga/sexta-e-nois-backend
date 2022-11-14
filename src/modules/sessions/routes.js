const { Router } = require('express')
const sessionsController = require('./controllers/sessions')

const ROUTES_PREFIX = '/sessions'
const router = Router()

router.post('/', sessionsController.login)

module.exports = {
  ROUTES_PREFIX,
  router
}
