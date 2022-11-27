const { Router } = require('express')
const waitlistController = require('./controllers/waitlist')

const ROUTES_PREFIX = '/waitlist'
const router = Router()

router.post('/', waitlistController.create)

router.get('/', waitlistController.list)

router.get('/:id', waitlistController.find)

router.put('/:id', waitlistController.update)

router.delete('/:id', waitlistController.remove)

module.exports = {
  ROUTES_PREFIX,
  router
}
