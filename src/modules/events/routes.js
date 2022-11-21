const { Router } = require('express')
const eventsController = require('./controllers/events')

const authentication = require('../../utils/middlewares/authentication')

const ROUTES_PREFIX = '/events'
const router = Router()

router.post('/', authentication.verifyRole(['Administrador', 'Resp. Evento']), eventsController.create)

router.get('/', eventsController.list)
router.get('/:id', eventsController.find)

router.put('/:id', authentication.verifyRole(['Administrador', 'Resp. Evento']), eventsController.update)

router.delete('/:id', authentication.verifyRole(['Administrador', 'Resp. Evento']), eventsController.remove)

module.exports = {
  ROUTES_PREFIX,
  router
}
