const joi = require('joi')

const ValidationStudent = joi.object({
  cpf: joi.string().required(),
  nome: joi.string().required(),
  data_nascimento: joi.date().required(),
  responsavel_aluno_id: joi.number().required()
})

const ValidationResponsible = joi.object({
  cpf: joi.string().required(),
  nome: joi.string().required(),
  data_nascimento: joi.date().required()
})

module.exports = {
  ValidationStudent,
  ValidationResponsible
}
