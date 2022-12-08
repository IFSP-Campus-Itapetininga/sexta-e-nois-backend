const { Router } = require('express')
const waitlistController = require('./controllers/waitlist')

const authentication = require('../../utils/middlewares/authentication')

const ROUTES_PREFIX = '/waitlist'
const router = Router()

router.post('/', authentication.verifyRole(['Administrador', 'Secretário']), waitlistController.create)

router.get('/', authentication.verifyRole(['Administrador', 'Secretário']), waitlistController.list)

router.get('/:id', authentication.verifyRole(['Administrador', 'Secretário']), waitlistController.find)

router.put('/:id', authentication.verifyRole(['Administrador', 'Secretário']), waitlistController.update)

router.delete('/:id', authentication.verifyRole(['Administrador', 'Secretário']), waitlistController.remove)

module.exports = {
  ROUTES_PREFIX,
  router
}
