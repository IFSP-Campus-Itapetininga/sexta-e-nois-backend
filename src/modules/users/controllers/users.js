const bcrypt = require('bcrypt')

const User = require('../models/User')
const usernameGenerator = require('../utils/usernameGenerator')

const userModel = User()

const create = async (req, res) => {
  const { nome, senha, idPapel } = req.body

  try {
    const username = usernameGenerator.createUsernameFromName(nome)

    const hashPassword = await bcrypt.hash(senha, 10)

    const userId = await userModel.create({ nome: username, senha: hashPassword, idPapel })

    res.status(200).send({ id: userId, nome: username })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const list = async (req, res) => {
  try {
    const events = await userModel.list()

    res.send(events)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const find = async (req, res) => {
  const { id } = req.params

  try {
    const event = await userModel.findById(id)

    res.send(event)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const update = async (req, res) => {
  const { id } = req.params
  const { nome, idPapel } = req.body

  try {
    await userModel.update(id, { nome, idPapel })

    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const updatePassword = async (req, res) => {
  const { id } = req.params
  const { senha } = req.body

  try {
    const hashPassword = await bcrypt.hash(senha, 10)

    await userModel.update(id, { senha: hashPassword })

    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const remove = async (req, res) => {
  const { id } = req.params

  try {
    await userModel.remove(id)

    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = { create, list, find, update, updatePassword, remove }
