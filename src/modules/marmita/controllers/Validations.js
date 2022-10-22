const joi = require('joi')

const ValidationCreateSchema = joi.object({
  titulo: joi.string().required(),
  preco: joi.number().required()
})

module.exports = { ValidationCreateSchema }
