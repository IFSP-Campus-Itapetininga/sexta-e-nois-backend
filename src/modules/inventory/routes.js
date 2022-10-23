const { Router } = require('express')
const inventoryController = require('./controllers/inventory')

const ROUTES_PREFIX = '/inventory'
const router = Router()

router.get('/', inventoryController.listItems)
router.get('/:iditem', inventoryController.findItem)
router.post('/', inventoryController.createItem)
router.delete('/:iditem', inventoryController.removeItem)

module.exports = {
  ROUTES_PREFIX,
  router
}
