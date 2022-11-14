const Role = require('../models/Role')

const roleModel = Role()

const create = async (req, res) => {
  const { nome } = req.body

  try {
    await roleModel.create({ nome })

    res.status(201).send()
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const list = async (req, res) => {
  try {
    const roles = await roleModel.list()

    res.send(roles)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = { create, list }
