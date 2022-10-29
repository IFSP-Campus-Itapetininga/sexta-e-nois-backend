const ProductModel = require('../models/Product')
const validations = require('../utils/Validations')

const getAllProducts = async (req, res) => {
  try {
    const query = req.query

    const page = query.page - 1 || 0
    const limit = +query.limit || 10
    const search = query.search || null

    const data = await ProductModel().list(page, limit, search)
    res.json(data).status(200)
  } catch (error) {
    res.status(400).json({
      message: error?.message
    })
  }
}

const getProduct = async (req, res) => {
  try {
    const id = req.params.id

    const data = await ProductModel().find(id)
    res.json(data).status(200)
  } catch (error) {
    res.status(400).json({
      message: error?.message
    })
  }
}

const getProductByCriteria = async (req, res) => {
  try {
    const query = req.query
    const validation = validations.ValidationProductSearchSchema.validate(query)

    if (validation.error) {
      res.status(400).json({
        message: 'Validation Error',
        data: validation.error.details
      })

      return
    }

    const title = query.title

    const data = await ProductModel().search(title)
    res.json(data).status(200)
  } catch (error) {
    res.status(400).json({
      message: error?.message
    })
  }
}

const createProduct = async (req, res) => {
  try {
    const data = req.body
    const validation = validations.ValidationProductCreateSchema.validate(data)

    if (validation.error) {
      res.status(400).json({
        message: 'Validation Error',
        data: validation.error.details
      })

      return
    }

    await ProductModel().create(data)

    res.status(201).json()
  } catch (error) {
    res.status(400).json({
      message: error?.message
    })
  }
}

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id
    const data = req.body
    const validation = validations.ValidationProductUpdateSchema.validate(data)

    if (validation.error) {
      res.status(400).json({
        message: 'Validation Error',
        data: validation.error.details
      })

      return
    }

    await ProductModel().update(id, data)
    const product = await ProductModel().find(id)

    res.status(200).json(product)
  } catch (error) {
    res.status(400).json({
      message: error?.message
    })
  }
}

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id

    await ProductModel().remove(id)

    res.status(202).json()
  } catch (error) {
    res.status(400).json({
      message: error?.message
    })
  }
}

module.exports = {
  getAllProducts,
  getProductByCriteria,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}
