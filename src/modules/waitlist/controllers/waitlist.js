const Waitlist = require('../models/Waitlist')
const { validationCreateWaitlist } = require('../utils')

const waitlistModel = Waitlist()

const create = async (req, res) => {
  const data = req.body
  const validation = validationCreateWaitlist.validate(data)

  if (validation.error) {
    res.status(400).json({ error: validation.error.details })
    return
  }
  try {
    await waitlistModel.create(data)

    res.status(201).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const list = async (req, res) => {
  try {
    const waitlist = await waitlistModel.list()

    res.send(waitlist)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const find = async (req, res) => {
  const { id } = req.params

  try {
    const student = await waitlistModel.find(id)

    res.send(student)
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
