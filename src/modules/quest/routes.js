const { Router } = require('express')
const questController = require('./controllers/quest')

const ROUTES_PREFIX = '/quest'
const router = Router()

router.get('/teste',  questController.teste)

router.post('/',      questController.create)

router.get('/',       questController.list)

router.get('/:id',    questController.find)

router.put('/:id',    questController.update)

router.delete('/:id', questController.remove)

module.exports = {
  ROUTES_PREFIX,
  router
}
