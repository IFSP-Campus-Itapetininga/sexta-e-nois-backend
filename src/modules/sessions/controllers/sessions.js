const jwt = require('jsonwebtoken')
const User = require('../models/User')

const userModel = User()
const jwtSecret = process.env.JWT_SECRET

const create = async (req, res) => {
  const { email, senha } = req.body

  try {
    const foundUser = await userModel.findByEmailAndPassword(email, senha)

    if (email === foundUser.email && senha === foundUser.senha) {
      const token = jwt.sign({
        userId: foundUser.id,
        userName: foundUser.nome,
        roleName: foundUser.nomePapel
      }, jwtSecret)

      res.send({ token })
    } else {
      res.status(401).json({ error: 'E-mail ou senha errados.' })
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = { create }
