const Prof = require('../models/Prof')

const profModel = Prof()

const create = async (req, res) => {
  const { nome, especialidade } = req.body

  try {
    await profModel.create({ nome, especialidade })
    res.send('criando profissional!')

    res.status(201).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const list = async (req, res) => {
  try {
    const prof = await profModel.list()

    res.send(prof)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const find = async (req, res) => {
  const { id } = req.params

  try {
    const prof = await profModel.find(id)

    res.send(prof)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const update = async (req, res) => {
  const { id } = req.params
  const { nome, especialidade } = req.body

  try {
    await profModel.update(id, { nome, especialidade })

    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const remove = async (req, res) => {
  const { id } = req.params

  try {
    await profModel.remove(id)

    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
  create,
  list,
  find,
  update,
  remove
}
