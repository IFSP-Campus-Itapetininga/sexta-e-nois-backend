const { Router } = require('express')
const profController = require('./controllers/prof')

const ROUTES_PREFIX = '/prof'
const router = Router()

router.get('/teste',  profController.teste)

router.post('/',      profController.create)

router.get('/',       profController.list)

router.get('/:id',    profController.find)

router.put('/:id',    profController.update)

router.delete('/:id', profController.remove)

module.exports = {
  ROUTES_PREFIX,
  router
}
