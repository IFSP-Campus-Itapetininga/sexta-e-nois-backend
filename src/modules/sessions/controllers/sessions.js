const jwt = require('jsonwebtoken')
const User = require('../models/User')

const userModel = User()
const jwtSecret = process.env.JWT_SECRET

const create = async (req, res) => {
  const { email, senha } = req.body

  try {
    const foundUser = await userModel.findByEmailAndPassword(email, senha)
    // const foundUser = {
    //   id: 1,
    //   nome: 'Bob',
    //   email: 'bob@sextaenois.com.br',
    //   senha: 'admin123', // senha devera ser encriptada na versao final
    //   papel: 1
    // }

    if (email === foundUser.email && senha === foundUser.senha) {
      const token = jwt.sign({
        subject: foundUser.id,
        name: foundUser.nome,
        role: foundUser.papel
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
