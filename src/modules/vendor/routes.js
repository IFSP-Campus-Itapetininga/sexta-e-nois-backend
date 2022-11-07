const { Router } = require('express')
const vendorController = require('./controllers/vendor')

const ROUTES_PREFIX = '/vendor'
const router = Router()

router.post('/', vendorController.createVendor)
router.get('/', vendorController.listVendor)
router.get('/:vendorid', vendorController.findVendor)

router.post('/contact/', vendorController.createContact)
router.patch('/contact/', vendorController.updateContact)
router.delete('/contact/:contactid', vendorController.removeContact)

router.patch('/address/', vendorController.updateAddress)

module.exports = {
  ROUTES_PREFIX,
  router
}
