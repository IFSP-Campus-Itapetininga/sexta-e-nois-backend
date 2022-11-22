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

const ValidationOrderCreateSchema = joi.object({
  delivery: joi.boolean(),
  clienteId: joi.number().required(),
  produtos: joi.array().items({
    id: joi.number().required(),
    titulo: joi.string(),
    preco: joi.number(),
    quantidade: joi.number().required()
  })
})

const ValidationOrderUpdateSchema = joi.object({
  delivery: joi.boolean(),
  status: joi.string().valid('started', 'finalized', 'canceled').required(),
  clienteId: joi.number(),
  produtos: joi.array().items({
    id: joi.number().required(),
    titulo: joi.string(),
    preco: joi.number(),
    quantidade: joi.number().required()
  })
})

const ValidationOrderUpdateStatusSchema = joi.object({
  status: joi.string().valid('started', 'finalized', 'canceled').required()
})
const ValidationStatisticsSchema = joi.object({
  initial_date: joi.string().required(),
  final_date: joi.string().required()
})

module.exports = {
  ValidationProductSearchSchema,
  ValidationProductCreateSchema,
  ValidationProductUpdateSchema,
  ValidationClientCreateSchema,
  ValidationClientUpdateSchema,
  ValidationOrderCreateSchema,
  ValidationOrderUpdateSchema,
  ValidationOrderUpdateStatusSchema,
  ValidationStatisticsSchema
}
