const { Router } = require('express')
const usersController = require('./controllers/users')

const authentication = require('../../utils/middlewares/authentication')

const ROUTES_PREFIX = '/users'
const router = Router()

router.post('/', authentication.verifyRole(['Administrador']), usersController.create)

router.get('/', authentication.verifyRole(['Administrador']), usersController.list)
router.get('/:id', authentication.verifyRole(['Administrador']), usersController.find)

router.put('/:id', authentication.verifyRole(['Administrador']), usersController.update)

router.patch('/:id/password', authentication.verifyRole(['Administrador']), usersController.updatePassword)

router.delete('/:id', authentication.verifyRole(['Administrador']), usersController.remove)

module.exports = {
  ROUTES_PREFIX,
  router
}
