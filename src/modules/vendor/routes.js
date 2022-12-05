const { Router } = require('express')
const vendorController = require('./controllers/Vendor')
const authentication = require('../../utils/middlewares/authentication')

const ROUTES_PREFIX = '/vendor'
const router = Router()

router.post('/', authentication.verifyRole(['Administrador', 'Almoxarife']), vendorController.createVendor)

router.get('/', vendorController.listVendor)
router.get('/:fornecedorid', vendorController.findVendor)
router.delete('/:fornecedorid', authentication.verifyRole(['Administrador', 'Almoxarife']), vendorController.removeVendor)

router.post('/contact/', authentication.verifyRole(['Administrador', 'Almoxarife']), vendorController.createContact)
router.patch('/contact/', authentication.verifyRole(['Administrador', 'Almoxarife']), vendorController.updateContact)
router.delete('/contact/:contatoid', authentication.verifyRole(['Administrador', 'Almoxarife']), vendorController.removeContact)

router.patch('/address', authentication.verifyRole(['Administrador', 'Almoxarife']), vendorController.updateAddress)

module.exports = {
  ROUTES_PREFIX,
  router
}
