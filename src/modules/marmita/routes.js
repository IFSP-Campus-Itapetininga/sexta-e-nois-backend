const { Router } = require('express')
const ProdutoController = require('./controllers/Produto')
const ClienteController = require('./controllers/Cliente')

const ROUTES_PREFIX = '/marmita'
const router = Router()

// Produtos
router.get('/produtos/', ProdutoController.getAllProducts)
router.post('/produtos/', ProdutoController.createProduct)
router.put('/produtos/:id', ProdutoController.updateProduct)
router.delete('/produtos/:id', ProdutoController.deleteProduct)

// Clientes
router.get('/clientes/', ClienteController.getAllClients)
router.get('/clientes/telefone', ClienteController.getClientByPhone)
router.get('/clientes/:id', ClienteController.getClient)
router.post('/clientes/', ClienteController.createClient)
router.put('/clientes/:id', ClienteController.updateClient)
router.delete('/clientes/:id', ClienteController.deleteClient)

module.exports = {
  ROUTES_PREFIX,
  router
}
