const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../users/models/User')

const userModel = User()
const jwtSecret = process.env.JWT_SECRET

const login= async (req, res) => {
  const { nome, senha } = req.body

  try {
    const foundUser = await userModel.findByUsername(nome)

    if (!await bcrypt.compare(senha, foundUser.senha)) throw new Error('Wrong username or password')

    const token = jwt.sign({
      user: {
            id: foundUser.id,
            name: foundUser.nome,
      },
      role: {
            name: foundUser.nomePapel
      }
    }, jwtSecret)

    res.send({ token })
  } catch (error) {
    res.status(401).json({ error: error.message })
  }
}

module.exports = { create }
