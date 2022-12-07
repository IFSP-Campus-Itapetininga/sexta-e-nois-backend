const Group = require('../models/Group')
const { ValidationGroup } = require('../utils')

const groupModel = Group()

const create = async (req, res) => {
  const data = req.body
  const validation = ValidationGroup.validate(data)

  if (validation.error) {
    res.status(400).json({ error: validation.error.details })
    return
  }
  try {
    await groupModel.create(data)

    res.status(201).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const list = async (req, res) => {
  try {
    const classes = await groupModel.list()

    res.send(classes)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const find = async (req, res) => {
  const { id } = req.params

  try {
    const oneClass = await groupModel.find(id)

    res.send(oneClass)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const update = async (req, res) => {
  const { id } = req.params
  const data = req.body
  const validation = ValidationGroup.validate(data)

  if (validation.error) {
    res.status(400).json({ error: validation.error.details })
    return
  }

  try {
    await groupModel.update(id, data)

    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const remove = async (req, res) => {
  const { id } = req.params

  try {
    await groupModel.remove(id)

    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = { create, list, find, update, remove }
