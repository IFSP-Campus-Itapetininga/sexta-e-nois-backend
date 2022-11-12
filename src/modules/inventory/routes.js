const { Router } = require('express')
const InventoryController = require('./controllers/inventory')

const ROUTES_PREFIX = '/inventory'
const router = Router()

// items
router.get('/item/', InventoryController.listItems)
router.get('/item/:itemid', InventoryController.findItem)
router.post('/item/', InventoryController.createItem)
router.delete('/item/:itemid', InventoryController.removeItem)
router.patch('/item/:itemid', InventoryController.updateItem)

// transactions
router.get('/transactions/:itemid', InventoryController.listItemTransactions)
router.post('/transactions/', InventoryController.createItemTransaction)

// Item Has Vendor
router.post('/item/vendor', InventoryController.createItemHasVendor)
router.get('/item/vendor/itemhasvendor/:itemid', InventoryController.listItemHasVendor)
router.get('/item/vendor/vendorhasitem/:fornecedorid', InventoryController.listVendorHasItem)
router.delete('/item/vendor/itemhasvendor', InventoryController.removeItemHasVendor)

module.exports = {
  ROUTES_PREFIX,
  router
}
