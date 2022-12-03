const { Router } = require('express')
const studentController = require('./controllers/student')
const responsibleController = require('./controllers/responsible')
const PhoneController = require('./controllers/phone')
const AddressController = require('./controllers/address')
const RegistrationController = require('./controllers/registration')
const AttendanceController = require('./controllers/attendance')
const ClassController = require('./controllers/class')
const WorkshopController = require('./controllers/workshop')
const InstructorController = require('./controllers/instructor')
const GroupController = require('./controllers/group')

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

router.post('/workshop', WorkshopController.create)

router.get('/workshop', WorkshopController.list)

router.get('/workshop/:id', WorkshopController.find)

router.put('/workshop/:id', WorkshopController.update)

router.delete('/workshop/:id', WorkshopController.remove)

router.post('/instructor', InstructorController.create)

router.get('/instructor', InstructorController.list)

router.get('/instructor/:id', InstructorController.find)

router.put('/instructor/:id', InstructorController.update)

router.delete('/instructor/:id', InstructorController.remove)

router.post('/group', GroupController.create)

router.get('/group', GroupController.list)

router.get('/group/:id', GroupController.find)

router.put('/group/:id', GroupController.update)

router.delete('/group/:id', GroupController.remove)

module.exports = {
  ROUTES_PREFIX,
  router
}
