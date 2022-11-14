const Role = require('../models/Role')

const roleModel = Role()

const list = async (req, res) => {
  try {
    const roles = await roleModel.list()

    res.send(roles)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { list }
