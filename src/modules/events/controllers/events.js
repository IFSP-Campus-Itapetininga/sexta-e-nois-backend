const Event = require('../models/Event')

const eventInstance = Event({})

const create = async (req, res) => {
  const { titulo, dataInicio, dataTermino, local, descricao } = req.body

  try {
    await eventInstance.create({ titulo, dataInicio, dataTermino, local, descricao })

    res.status(201).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const list = async (req, res) => {
  try {
    const events = await eventInstance.list()

    res.send(events)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const find = async (req, res) => {
  const { id } = req.params

  try {
    const [event] = await eventInstance.find(id)

    res.send(event)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const update = async (req, res) => {
  const { id } = req.params
  const { titulo, dataInicio, dataTermino, local, descricao } = req.body

  try {
    await eventInstance.update(id, { titulo, dataInicio, dataTermino, local, descricao })

    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const remove = async (req, res) => {
  const { id } = req.params

  try {
    await eventInstance.remove(id)

    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = { create, list, find, update, remove }
