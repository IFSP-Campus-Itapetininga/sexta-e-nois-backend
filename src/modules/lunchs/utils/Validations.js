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

const ValidationProductSearchSchema = joi.object({
  title: joi.string().required()
})

const ValidationClientCreateSchema = joi.object({
  nome: joi.string().required(),
  telefone: joi.string().required(),
  rua: joi.string().required(),
  numero: joi.string().required(),
  bairro: joi.string().required()
})

const ValidationClientUpdateSchema = joi.object({
  nome: joi.string().required(),
  telefone: joi.string(),
  rua: joi.string().required(),
  numero: joi.string().required(),
  bairro: joi.string().required()
})

module.exports = {
  ValidationProductSearchSchema,
  ValidationProductCreateSchema,
  ValidationProductUpdateSchema,
  ValidationClientCreateSchema,
  ValidationClientUpdateSchema
}
