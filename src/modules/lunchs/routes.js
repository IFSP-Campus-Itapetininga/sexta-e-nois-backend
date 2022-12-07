const { Router } = require('express')
const ProductController = require('./controllers/Product')
const ClientController = require('./controllers/Client')
const OrderController = require('./controllers/Order')
const StatisticsController = require('./controllers/Statistics')
const authentication = require('../../utils/middlewares/authentication')

const ROUTES_PREFIX = '/lunchs'
const router = Router()

// Produtos
router.get(
  '/products',
  authentication.verifyRole(['Administrador', 'Marmita']),
  ProductController.getAllProducts
)
router.get(
  '/products/:id',
  authentication.verifyRole(['Administrador', 'Marmita']),
  ProductController.getProduct
)
router.post(
  '/products/',
  authentication.verifyRole(['Administrador', 'Marmita']),
  ProductController.createProduct
)
router.put(
  '/products/:id',
  authentication.verifyRole(['Administrador', 'Marmita']),
  ProductController.updateProduct
)
router.delete(
  '/products/:id',
  authentication.verifyRole(['Administrador', 'Marmita']),
  ProductController.deleteProduct
)

// Clientes
router.get(
  '/clients/',
  authentication.verifyRole(['Administrador', 'Marmita']),
  ClientController.getAllClients
)
router.get(
  '/clients/phone',
  authentication.verifyRole(['Administrador', 'Marmita']),
  ClientController.getClientByPhone
)
router.get(
  '/clients/:id',
  authentication.verifyRole(['Administrador', 'Marmita']),
  ClientController.getClient
)
router.post(
  '/clients/',
  authentication.verifyRole(['Administrador', 'Marmita']),
  ClientController.createClient
)
router.put(
  '/clients/:id',
  authentication.verifyRole(['Administrador', 'Marmita']),
  ClientController.updateClient
)
router.delete(
  '/clients/:id',
  authentication.verifyRole(['Administrador', 'Marmita']),
  ClientController.deleteClient
)

// Orders
router.get(
  '/orders/',
  authentication.verifyRole(['Administrador', 'Marmita']),
  OrderController.getAllOrders
)
router.get(
  '/orders/:id',
  authentication.verifyRole(['Administrador', 'Marmita']),
  OrderController.getOrder
)
router.post(
  '/orders/',
  authentication.verifyRole(['Administrador', 'Marmita']),
  OrderController.createOrder
)
router.put(
  '/orders/status/:id',
  authentication.verifyRole(['Administrador', 'Marmita']),
  OrderController.updateOrderStatus
)
router.put(
  '/orders/:id',
  authentication.verifyRole(['Administrador', 'Marmita']),
  OrderController.updateOrder
)
router.delete(
  '/orders/:id',
  authentication.verifyRole(['Administrador', 'Marmita']),
  OrderController.deleteOrder
)

// Statistics
router.get(
  '/statistics',
  authentication.verifyRole(['Administrador', 'Marmita']),
  StatisticsController.getMarmitaStatitics
)

module.exports = {
  ROUTES_PREFIX,
  router
}
