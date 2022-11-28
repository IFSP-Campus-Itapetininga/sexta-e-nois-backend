const { Router } = require('express')
const grpController = require('./controllers/grp')

const ROUTES_PREFIX = '/groups'
const router = Router()

router.post('/',      grpController.create)

router.get('/',       grpController.list)

router.get('/:id',    grpController.find)

router.put('/:id',    grpController.update)

router.delete('/:id', grpController.remove)

module.exports = {
  ROUTES_PREFIX,
  router
}
