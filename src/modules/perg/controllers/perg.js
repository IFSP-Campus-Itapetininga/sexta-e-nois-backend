const Perg = require('../models/Perg')

const pergModel = Perg()

const create = async (req, res) => {
  const { idProf, idGrp, descricao } = req.body

  try {
    await pergModel.create({ idProf, idGrp, descricao })
    res.status(201).send()

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const list = async (req, res) => {
  try {
    const pergs = await pergModel.list()

    res.send(pergs)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const find = async (req, res) => {
  const { id } = req.params

  try {
    const pergs = await pergModel.find(id)

    res.send(pergs)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const update = async (req, res) => {
  const { id } = req.params
  const { idProf, idGrp, descricao } = req.body

  try {
    await pergModel.update(id, { idProf, idGrp, descricao })

    res.status(204).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const remove = async (req, res) => {
  const { id } = req.params

  try {
    await pergModel.remove(id)

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
