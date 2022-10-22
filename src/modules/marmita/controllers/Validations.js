const joi = require('joi')

const ValidationProductCreateSchema = joi.object({
  titulo: joi.string().required(),
  preco: joi.number().required()
})

const ValidationProductUpdateSchema = joi.object({
  id: joi.number(),
  titulo: joi.string().required(),
  preco: joi.number().required()
})

const ValidationClienteCreateSchema = joi.object({
  nome: joi.string().required(),
  telefone: joi.string().required(),
  rua: joi.string().required(),
  numero: joi.string().required(),
  bairro: joi.string().required()
})

const ValidationClienteUpdateSchema = joi.object({
  nome: joi.string().required(),
  telefone: joi.string(),
  rua: joi.string().required(),
  numero: joi.string().required(),
  bairro: joi.string().required()
})

module.exports = {
  ValidationProductCreateSchema,
  ValidationProductUpdateSchema,
  ValidationClienteCreateSchema,
  ValidationClienteUpdateSchema
}
