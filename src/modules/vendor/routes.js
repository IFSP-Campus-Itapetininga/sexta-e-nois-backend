const { Router } = require('express')
const vendorController = require('./controllers/vendor')

const ROUTES_PREFIX = '/vendor'
const router = Router()

router.post('/', vendorController.createVendor)
router.get('/', vendorController.listVendor)
router.get('/:vendorid', vendorController.findVendor)

router.post('/contact/', vendorController.createContact)
router.delete('/contact/:contactid', vendorController.removeContact)

router.post('/address/', vendorController.createContact)
router.patch('/address/', vendorController.updateAddress)

module.exports = {
  ROUTES_PREFIX,
  router
}
