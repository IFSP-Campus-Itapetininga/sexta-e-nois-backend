const MarmitaModel = require('../models/Marmita')
const validations = require('./Validations')

const getAllProducts = async (req, res) => {
  const data = await MarmitaModel().list()
  res.json(data).status(200)
}

const createProduct = async (req, res) => {
  try {
    const data = req.body
    const validation = validations.ValidationCreateSchema.validate(data)

    if (validation.error) {
      res.status(400).json({
        message: 'Validation Error',
        data: validation.error.details
      })

      return
    }

    await MarmitaModel().create(data)

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
    const validation = validations.ValidationCreateSchema.validate(data)

    if (validation.error) {
      res.status(400).json({
        message: 'Validation Error',
        data: validation.error.details
      })

      return
    }

    await MarmitaModel().update(id, data)
    const product = await MarmitaModel().find(id)

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

    await MarmitaModel().remove(id)

    res.status(202).json()
  } catch (error) {
    res.status(400).json({
      message: error?.message
    })
  }
}

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct
}
