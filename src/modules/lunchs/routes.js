const { Router } = require('express')
const ProductController = require('./controllers/Product')
const ClientController = require('./controllers/Client')

const ROUTES_PREFIX = '/lunchs'
const router = Router()

// Produtos
router.get('/products', ProductController.getAllProducts)
router.post('/products/', ProductController.createProduct)
router.put('/products/:id', ProductController.updateProduct)
router.delete('/products/:id', ProductController.deleteProduct)

// Clientes
router.get('/clients/', ClientController.getAllClients)
router.get('/clients/phone', ClientController.getClientByPhone)
router.get('/clients/:id', ClientController.getClient)
router.post('/clients/', ClientController.createClient)
router.put('/clients/:id', ClientController.updateClient)
router.delete('/clients/:id', ClientController.deleteClient)

module.exports = {
  ROUTES_PREFIX,
  router
}
