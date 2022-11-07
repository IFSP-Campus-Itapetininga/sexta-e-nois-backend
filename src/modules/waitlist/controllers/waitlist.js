const Waitlist = require('../models/Waitlist')

const waitlistModel = Waitlist()

const create = async (req, res) => {
  const { nome, alfabetizado, escolaridade, oficina, dataNascimento, dataCadastro, nomeResponsavel, telefone } = req.body

  try {
    await waitlistModel.create({ nome, alfabetizado, escolaridade, oficina, dataNascimento, dataCadastro, nomeResponsavel, telefone })

    res.status(201).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const list = async (req, res) => {
  try {
    const waitlists = await waitlistModel.list()

    res.send(waitlists)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const find = async (req, res) => {
  const { id } = req.params

  try {
    const waitlists = await waitlistModel.find(id)

    res.send(waitlists)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const update = async (req, res) => {
  const { id } = req.params
  const { nome, alfabetizado, escolaridade, oficina, dataNascimento, dataCadastro, nomeResponsavel, telefone } = req.body

  try {
    await waitlistModel.update(id, { nome, alfabetizado, escolaridade, oficina, dataNascimento, dataCadastro, nomeResponsavel, telefone })

    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const remove = async (req, res) => {
  const { id } = req.params

  try {
    await waitlistModel.remove(id)

    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = { create, list, find, update, remove }
