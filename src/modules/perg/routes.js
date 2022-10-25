const { Router } = require('express')
const pergController = require('./controllers/perg')

const ROUTES_PREFIX = '/perg'
const router = Router()

router.get('/teste',  pergController.teste)

router.post('/',      pergController.create)

router.get('/',       pergController.list)

router.get('/:id',    pergController.find)

router.put('/:id',    pergController.update)

router.delete('/:id', pergController.remove)

module.exports = {
  ROUTES_PREFIX,
  router
}
