const { Router } = require('express')
const eventsController = require('./controllers/events')

const { verifyAuth } = require('../../utils/middlewares/verifyAuth')

const ROUTES_PREFIX = '/events'
const router = Router()

router.post('/', verifyAuth, eventsController.create)

router.get('/', eventsController.list)
router.get('/:id', eventsController.find)

router.put('/:id', verifyAuth, eventsController.update)

router.delete('/:id', verifyAuth, eventsController.remove)

module.exports = {
  ROUTES_PREFIX,
  router
}
