const { Router } = require('express')
const studentController = require('./controllers/student')
const responsibleController = require('./controllers/responsible')
const PhoneController = require('./controllers/phone')
const AddressController = require('./controllers/address')
const RegistrationController = require('./controllers/registration')
const AttendanceController = require('./controllers/attendance')
const ClassController = require('./controllers/class')

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

router.post('/phone', PhoneController.create)

router.get('/phone', PhoneController.list)

router.get('/phone/:id', PhoneController.find)

router.put('/phone/:id', PhoneController.update)

router.delete('/phone/:id', PhoneController.remove)

router.post('/address', AddressController.create)

router.get('/address', AddressController.list)

router.get('/address/:id', AddressController.find)

router.put('/address/:id', AddressController.update)

router.delete('/address/:id', AddressController.remove)

router.post('/registration', RegistrationController.create)

router.get('/registration', RegistrationController.list)

router.get('/registration/:id', RegistrationController.find)

router.put('/registration/:id', RegistrationController.update)

router.delete('/registration/:id', RegistrationController.remove)

router.post('/attendance', AttendanceController.create)

router.get('/attendance', AttendanceController.list)

router.get('/attendance/:id', AttendanceController.find)

router.put('/attendance/:id', AttendanceController.update)

router.delete('/attendance/:id', AttendanceController.remove)

router.post('/attendance', AttendanceController.create)

router.get('/attendance', AttendanceController.list)

router.get('/attendance/:id', AttendanceController.find)

router.put('/attendance/:id', AttendanceController.update)

router.delete('/attendance/:id', AttendanceController.remove)

router.post('/class', ClassController.create)

router.get('/class', ClassController.list)

router.get('/class/:id', ClassController.find)

router.put('/class/:id', ClassController.update)

router.delete('/class/:id', ClassController.remove)

module.exports = {
  ROUTES_PREFIX,
  router
}
