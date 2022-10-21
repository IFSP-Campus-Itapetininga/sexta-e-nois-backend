const { Router } = require('express')
const eventsController = require('./controllers/events')

const ROUTES_PREFIX = '/events'
const router = Router()

router.post('/', eventsController.create)

router.get('/', eventsController.list)
router.get('/:id', eventsController.find)

router.put('/:id', eventsController.update)

router.delete('/:id', eventsController.remove)

module.exports = {
  ROUTES_PREFIX,
  router
}
