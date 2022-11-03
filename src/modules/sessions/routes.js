const { Router } = require('express')
const sessionsController = require('./controllers/sessions')

const ROUTES_PREFIX = '/sessions'
const router = Router()

router.post('/', sessionsController.create)

module.exports = {
  ROUTES_PREFIX,
  router
}
