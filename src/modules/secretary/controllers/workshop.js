const Workshop = require('../models/Workshop')
const { ValidationWorkshop } = require('../utils')

const workshopModel = Workshop()

const create = async (req, res) => {
  const data = req.body
  const validation = ValidationWorkshop.validate(data)

  if (validation.error) {
    res.status(400).json({ error: validation.error.details })
    return
  }
  try {
    await workshopModel.create(data)

    res.status(201).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const list = async (req, res) => {
  try {
    const workshops = await workshopModel.list()

    res.send(workshops)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const find = async (req, res) => {
  const { id } = req.params

  try {
    const workshop = await workshopModel.find(id)

    res.send(workshop)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const update = async (req, res) => {
  const { id } = req.params
  const data = req.body
  const validation = ValidationWorkshop.validate(data)

  if (validation.error) {
    res.status(400).json({ error: validation.error.details })
    return
  }

  try {
    await workshopModel.update(id, data)

    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const remove = async (req, res) => {
  const { id } = req.params

  try {
    await workshopModel.remove(id)

    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = { create, list, find, update, remove }
