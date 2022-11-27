const joi = require('joi')

const validationCreateWaitlist = joi.object({
  nome: joi.string().required(),
  alfabetizado: joi.number().required(),
  escolaridade: joi.string().required(),
  oficina: joi.string().required(),
  dataNascimento: joi.date().required(),
  nomeResponsavel: joi.string().required(),
  telefone: joi.string().required()
})

module.exports = {
  validationCreateWaitlist
}
