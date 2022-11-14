const { Router } = require('express')
const rolesController = require('./controllers/roles')

const authentication = require('../../utils/middlewares/authentication')

const ROUTES_PREFIX = '/roles'
const router = Router()

router.post('/', authentication.verifyRole(['Administrador']), rolesController.create)

router.get('/', authentication.verifyRole(['Administrador']), rolesController.list)

module.exports = {
  ROUTES_PREFIX,
  router
}
