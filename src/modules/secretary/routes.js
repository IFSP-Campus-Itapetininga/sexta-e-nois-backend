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

const authentication = require('../../utils/middlewares/authentication')

const ROUTES_PREFIX = '/secretary'
const router = Router()

router.post('/student', authentication.verifyRole(['Administrador', 'Secretário']), studentController.create)

router.get('/student', authentication.verifyRole(['Administrador', 'Secretário']), studentController.list)

router.get('/student/:id', authentication.verifyRole(['Administrador', 'Secretário', 'Aluno']), studentController.find)

router.put('/student/:id', authentication.verifyRole(['Administrador', 'Secretário']), studentController.update)

router.delete('/student/:id', authentication.verifyRole(['Administrador', 'Secretário']), studentController.remove)

// -----------------------------------------------------------------------------------------------------------------

router.post('/responsible', authentication.verifyRole(['Administrador', 'Secretário']), responsibleController.create)

router.get('/responsible', authentication.verifyRole(['Administrador', 'Secretário']), responsibleController.list)

router.get('/responsible/:id', authentication.verifyRole(['Administrador', 'Secretário', 'Aluno']), responsibleController.find)

router.put('/responsible/:id', authentication.verifyRole(['Administrador', 'Secretário']), responsibleController.update)

router.delete('/responsible/:id', authentication.verifyRole(['Administrador', 'Secretário']), responsibleController.remove)

// -----------------------------------------------------------------------------------------------------------------  

router.post('/phone', authentication.verifyRole(['Administrador', 'Secretário']), PhoneController.create)

router.get('/phone', authentication.verifyRole(['Administrador', 'Secretário']), PhoneController.list)

router.get('/phone/:id', authentication.verifyRole(['Administrador', 'Secretário']), PhoneController.find)

router.put('/phone/:id', authentication.verifyRole(['Administrador', 'Secretário']), PhoneController.update)

router.delete('/phone/:id', authentication.verifyRole(['Administrador', 'Secretário']), PhoneController.remove)

// -----------------------------------------------------------------------------------------------------------------

router.post('/address', authentication.verifyRole(['Administrador', 'Secretário']), AddressController.create)

router.get('/address', authentication.verifyRole(['Administrador', 'Secretário']), AddressController.list)

router.get('/address/:id', authentication.verifyRole(['Administrador', 'Secretário']), AddressController.find)

router.put('/address/:id', authentication.verifyRole(['Administrador', 'Secretário']), AddressController.update)

router.delete('/address/:id', authentication.verifyRole(['Administrador', 'Secretário']), AddressController.remove)

// -----------------------------------------------------------------------------------------------------------------

router.post('/registration', authentication.verifyRole(['Administrador', 'Secretário']), RegistrationController.create)

router.get('/registration', authentication.verifyRole(['Administrador', 'Secretário']), RegistrationController.list)

router.get('/registration/:id', authentication.verifyRole(['Administrador', 'Secretário', 'Aluno']), RegistrationController.find)

router.put('/registration/:id', authentication.verifyRole(['Administrador', 'Secretário']), RegistrationController.update)

router.delete('/registration/:id', authentication.verifyRole(['Administrador', 'Secretário']), RegistrationController.remove)

// -----------------------------------------------------------------------------------------------------------------

router.post('/attendance', authentication.verifyRole(['Administrador'], 'Secretário', ), AttendanceController.create)

router.get('/attendance', authentication.verifyRole(['Administrador'], 'Secretário'), AttendanceController.list)

router.get('/attendance/:id', authentication.verifyRole(['Administrador'], 'Secretário'), AttendanceController.find)

router.put('/attendance/:id', authentication.verifyRole(['Administrador'], 'Secretário'), AttendanceController.update)

router.put('/attendance/:id', authentication.verifyRole(['Administrador'], 'Secretário'), AttendanceController.remove)

// -----------------------------------------------------------------------------------------------------------------

router.post('/class', authentication.verifyRole(['Administrador'], 'Secretário'), ClassController.create)

router.get('/class', authentication.verifyRole(['Administrador'], 'Secretário'), ClassController.list)

router.get('/class/:id', authentication.verifyRole(['Administrador'], 'Secretário'), ClassController.find)

router.put('/class/:id', authentication.verifyRole(['Administrador'], 'Secretário'), ClassController.update)

router.delete('/class/:id', authentication.verifyRole(['Administrador'], 'Secretário'), ClassController.remove)

// -----------------------------------------------------------------------------------------------------------------

router.post('/workshop', authentication.verifyRole(['Administrador', 'Secretário', 'Instrutor']), WorkshopController.create)

router.get('/workshop', authentication.verifyRole(['Administrador', 'Secretário', 'Instrutor', 'Aluno']), WorkshopController.list)

router.get('/workshop/:id', authentication.verifyRole(['Administrador', 'Secretário', 'Instrutor', 'Aluno']), WorkshopController.find)

router.put('/workshop/:id', authentication.verifyRole(['Administrador', 'Secretário', 'Instrutor']), WorkshopController.update)

router.delete('/workshop/:id', authentication.verifyRole(['Administrador', 'Secretário', 'Instrutor']), WorkshopController.remove)

// -----------------------------------------------------------------------------------------------------------------

router.post('/instructor', authentication.verifyRole(['Administrador', 'Secretário']), InstructorController.create)

router.get('/instructor', authentication.verifyRole(['Administrador', 'Secretário']), InstructorController.list)

router.get('/instructor/:id', authentication.verifyRole(['Administrador', 'Secretário', 'Instrutor']), InstructorController.find)

router.put('/instructor/:id', authentication.verifyRole(['Administrador', 'Secretário']), InstructorController.update)

router.delete('/instructor/:id', authentication.verifyRole(['Administrador', 'Secretário']), InstructorController.remove)

// -----------------------------------------------------------------------------------------------------------------

router.post('/group', authentication.verifyRole(['Administrador', 'Secretário', 'Instrutor']), GroupController.create)

router.get('/group', authentication.verifyRole(['Administrador', 'Secretário', 'Instrutor']), GroupController.list)

router.get('/group/:id', authentication.verifyRole(['Administrador', 'Secretário', 'Instrutor', 'Aluno']), GroupController.find)

router.put('/group/:id', authentication.verifyRole(['Administrador', 'Secretário', 'Instrutor']), GroupController.update)

router.delete('/group/:id', authentication.verifyRole(['Administrador', 'Secretário', 'Instrutor']), GroupController.remove)

module.exports = {
  ROUTES_PREFIX,
  router
}
