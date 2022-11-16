const Aluno = require('../models/Aluno')

const alunoModel = Aluno()

const create = async (req, res) => {
  const { nome, dataNasc } = req.body

  try {
    await alunoModel.create({ nome, dataNasc })
    res.status(201).send({message: 'Criando Usuário!'})

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const list = async (req, res) => {
  try {
    const aluno = await alunoModel.list()

    res.send(aluno)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const find = async (req, res) => {
  const { id } = req.params

  try {
    const aluno = await alunoModel.find(id)

    res.send(aluno)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const update = async (req, res) => {
  const { id } = req.params
  const { nome, dataNasc } = req.body

  try {
    await alunoModel.update(id, { nome, dataNasc })

    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const remove = async (req, res) => {
  const { id } = req.params

  try {
    await alunoModel.remove(id)

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
