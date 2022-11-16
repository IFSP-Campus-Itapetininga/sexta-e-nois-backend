const { Router } = require('express')
const alunoController = require('./controllers/aluno')

const ROUTES_PREFIX = '/aluno'
const router = Router()

router.post('/',      alunoController.create)

router.get('/',       alunoController.list)

router.get('/:id',    alunoController.find)

router.put('/:id',    alunoController.update)

router.delete('/:id', alunoController.remove)

module.exports = {
  ROUTES_PREFIX,
  router
}
