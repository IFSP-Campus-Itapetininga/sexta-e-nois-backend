const OrderModel = require('../models/Order')
const validations = require('../utils/Validations')

const getOrder = async (req, res) => {
  try {
    const { id } = req.params

    const data = await OrderModel().find(id)
    res.json(data).status(200)
  } catch (error) {
    res.status(400).json({
      message: error?.message
    })
  }
}

const getAllOrders = async (req, res) => {
  try {
    const query = req.query

    const page = query.page - 1 || 0
    const limit = +query.limit || 10
    const order = query.order || 'asc'
    const filter = query.filter || null

    const data = await OrderModel().list(page, limit, order, filter)
    res.json(data).status(200)
  } catch (error) {
    res.status(400).json({
      message: error?.message
    })
  }
}

const createOrder = async (req, res) => {
  try {
    const data = req.body
    const validation = validations.ValidationOrderCreateSchema.validate(data)

    if (validation.error) {
      res.status(400).json({
        message: 'Validation Error',
        data: validation.error.details
      })

      return
    }

    await OrderModel().create(data)

    res.status(201).json()
  } catch (error) {
    res.status(400).json({
      message: error?.message
    })
  }
}

const updateOrder = async (req, res) => {
  try {
    const id = req.params.id
    const data = req.body
    const validation = validations.ValidationOrderUpdateSchema.validate(data)

    if (validation.error) {
      res.status(400).json({
        message: 'Validation Error',
        data: validation.error.details
      })

      return
    }

    await OrderModel().update(id, data)
    const client = await OrderModel().find(id)

    res.status(200).json(client)
  } catch (error) {
    res.status(400).json({
      message: error?.message
    })
  }
}

const updateOrderStatus = async (req, res) => {
  try {
    const id = req.params.id
    const data = req.body
    const validation =
      validations.ValidationOrderUpdateStatusSchema.validate(data)

    if (validation.error) {
      res.status(400).json({
        message: 'Validation Error',
        data: validation.error.details
      })

      return
    }

    await OrderModel().updateStatus(id, data)
    const client = await OrderModel().find(id)

    res.status(200).json(client)
  } catch (error) {
    res.status(400).json({
      message: error?.message
    })
  }
}

const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id

    await OrderModel().remove(id)

    res.status(202).json()
  } catch (error) {
    res.status(400).json({
      message: error?.message
    })
  }
}

module.exports = {
  getOrder,
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  updateOrderStatus
}
