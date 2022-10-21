const Event = require('../models/Event')

const eventModel = Event()

const create = async (req, res) => {
  const { titulo, dataInicio, dataTermino, local, descricao } = req.body

  try {
    await eventModel.create({ titulo, dataInicio, dataTermino, local, descricao })

    res.status(201).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const list = async (req, res) => {
  try {
    const events = await eventModel.list()

    res.send(events)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const find = async (req, res) => {
  const { id } = req.params

  try {
    const event = await eventModel.find(id)

    res.send(event)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const update = async (req, res) => {
  const { id } = req.params
  const { titulo, dataInicio, dataTermino, local, descricao } = req.body

  try {
    await eventModel.update(id, { titulo, dataInicio, dataTermino, local, descricao })

    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const remove = async (req, res) => {
  const { id } = req.params

  try {
    await eventModel.remove(id)

    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = { create, list, find, update, remove }
