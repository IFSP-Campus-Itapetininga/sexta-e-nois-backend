const { Router } = require('express')
const InventoryController = require('./controllers/inventory')
const authentication = require('../../utils/middlewares/authentication')

const ROUTES_PREFIX = '/inventory'
const router = Router()

// items
router.get('/item/', InventoryController.listItems)
router.get('/item/:itemid', InventoryController.findItem)
router.post('/item/', authentication.verifyRole(['Administrador', 'Almoxarife']), InventoryController.createItem)
router.delete('/item/:itemid', authentication.verifyRole(['Administrador', 'Almoxarife']), InventoryController.removeItem)
router.patch('/item/:itemid', authentication.verifyRole(['Administrador', 'Almoxarife']), InventoryController.updateItem)

// transactions
router.get('/transactions/:itemid', InventoryController.listItemTransactions)
router.get('/transactions/', InventoryController.listAllTransactions)
router.post('/transactions/', authentication.verifyRole(['Administrador', 'Almoxarife']), InventoryController.createItemTransaction)

// Item Has Vendor
router.post('/item/vendor', authentication.verifyRole(['Administrador', 'Almoxarife']), InventoryController.createItemHasVendor)
router.get('/item/vendor/itemhasvendor/:itemid', InventoryController.listItemHasVendor)
router.get('/item/vendor/vendorhasitem/:fornecedorid', InventoryController.listVendorHasItem)
router.delete('/item/vendor/itemhasvendor', authentication.verifyRole(['Administrador', 'Almoxarife']), InventoryController.removeItemHasVendor)

module.exports = {
  ROUTES_PREFIX,
  router
}
