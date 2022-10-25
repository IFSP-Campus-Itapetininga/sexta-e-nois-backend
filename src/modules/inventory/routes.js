const { Router } = require('express')
const InventoryController = require('./controllers/inventory')

const ROUTES_PREFIX = '/inventory'
const router = Router()

// items
router.get('/item/', InventoryController.listItems)
router.get('/item/:iditem', InventoryController.findItem)
router.post('/item/', InventoryController.createItem)
router.delete('/item/:iditem', InventoryController.removeItem)
router.patch('/item/:iditem', InventoryController.updateItem)

// transactions
router.get('/transactions/:iditem', InventoryController.listItemTransactions)
router.post('/transactions/', InventoryController.createItemTransaction)

module.exports = {
  ROUTES_PREFIX,
  router
}
