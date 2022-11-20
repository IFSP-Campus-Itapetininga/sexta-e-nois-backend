const { Router } = require('express')
const vendorController = require('./controllers/vendor')

const ROUTES_PREFIX = '/vendor'
const router = Router()

router.post('/', vendorController.createVendor)
router.get('/', vendorController.listVendor)
router.get('/:fornecedorid', vendorController.findVendor)
router.delete('/:fornecedorid', vendorController.removeVendor)

router.post('/contact/', vendorController.createContact)
router.patch('/contact/', vendorController.updateContact)
router.delete('/contact/:contatoid', vendorController.removeContact)

router.patch('/address', vendorController.updateAddress)

module.exports = {
  ROUTES_PREFIX,
  router
}
