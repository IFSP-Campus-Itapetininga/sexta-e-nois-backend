const Address = require('../models/Address')
const { ValidationAddress } = require('../utils')

const addressModel = Address()

const create = async (req, res) => {
  const data = req.body
  const validation = ValidationAddress.validate(data)

  if (validation.error) {
    res.status(400).json({ error: validation.error.details })
    return
  }
  try {
    await addressModel.create(data)

    res.status(201).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const list = async (req, res) => {
  try {
    const addresses = await addressModel.list()

    res.send(addresses)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const find = async (req, res) => {
  const { id } = req.params

  try {
    const address = await addressModel.find(id)

    res.send(address)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const update = async (req, res) => {
  const { id } = req.params
  const data = req.body
  const validation = ValidationAddress.validate(data)

  if (validation.error) {
    res.status(400).json({ error: validation.error.details })
    return
  }

  try {
    await addressModel.update(id, data)

    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const remove = async (req, res) => {
  const { id } = req.params

  try {
    await addressModel.remove(id)

    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = { create, list, find, update, remove }
