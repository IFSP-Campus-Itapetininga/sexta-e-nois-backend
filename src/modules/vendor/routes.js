const { Router } = require('express')
const vendorController = require('./controllers/vendor')

const ROUTES_PREFIX = '/vendor'
const router = Router()

router.post('/', vendorController.createVendor)
router.get('/', vendorController.listVendor)

module.exports = {
  ROUTES_PREFIX,
  router
}
