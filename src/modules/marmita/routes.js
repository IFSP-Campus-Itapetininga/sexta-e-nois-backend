const { Router } = require('express')
const marmitaController = require('./controllers/marmita')

const ROUTES_PREFIX = '/marmita'
const router = Router()

router.get('/', marmitaController.getAllProducts)
router.post('/', marmitaController.createProduct)
router.put('/:id', marmitaController.updateProduct)
router.delete('/:id', marmitaController.deleteProduct)

module.exports = {
  ROUTES_PREFIX,
  router
}
