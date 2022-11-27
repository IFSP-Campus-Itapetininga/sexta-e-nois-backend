const { Router } = require('express')
const studentController = require('./controllers/student')
const responsibleController = require('./controllers/responsible')

const ROUTES_PREFIX = '/secretary'
const router = Router()

router.post('/student', studentController.create)

router.get('/student', studentController.list)

router.get('/student/:id', studentController.find)

router.put('/student/:id', studentController.update)

router.delete('/student/:id', studentController.remove)

router.post('/responsible', responsibleController.create)

router.get('/responsible', responsibleController.list)

router.get('/responsible/:id', responsibleController.find)

router.put('/responsible/:id', responsibleController.update)

router.delete('/responsible/:id', responsibleController.remove)

module.exports = {
  ROUTES_PREFIX,
  router
}
