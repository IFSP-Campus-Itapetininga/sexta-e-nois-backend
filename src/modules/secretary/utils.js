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

const ValidationPhone = joi.object({
  ddd: joi.string().required(),
  numero: joi.string().required(),
  tipo: joi.string().required(),
  responsavel_telefone_id: joi.number().required()
})

const ValidationAddress = joi.object({
  cep: joi.string().required(),
  logradouro: joi.string().required(),
  numero: joi.number().required(),
  complemento: joi.string().required(),
  bairro: joi.string().required(),
  cidade: joi.string().required(),
  uf: joi.string().required(),
  responsavel_endereco_id: joi.number().required()
})

const ValidationRegistration = joi.object({
  aluno_id: joi.number().required(),
  turma_id: joi.number().required()
})

const ValidationAttendance = joi.object({
  matricula_id: joi.number().required(),
  aula_id: joi.number().required(),
  presenca: joi.number().required()
})

const ValidationClass = joi.object({
  titulo: joi.string().required(),
  dataInicio: joi.string().required(),
  dataTermino: joi.string().required(),
  local: joi.string().required(),
  descricao: joi.string().required()
})

const ValidationInstructor = joi.object({
  nome: joi.string().required(),
  cpf: joi.string().required(),
  email: joi.string().required(),
  atividade: joi.object().required()
})

const ValidationWorkshop = joi.object({
  nome: joi.string().required(),
  idade_minima: joi.number().required(),
  idade_maxima: joi.number().required(),
  outras_restricoes: joi.string(),
  atividade: joi.object()
})

const ValidationGroup = joi.object({
  oficina_id: joi.number().required(),
  oficineiro_id: joi.number().required(),
  horario: joi.string().required(),
  vagas: joi.number().required()
})

module.exports = {
  ValidationStudent,
  ValidationResponsible,
  ValidationPhone,
  ValidationAddress,
  ValidationRegistration,
  ValidationAttendance,
  ValidationClass,
  ValidationInstructor,
  ValidationWorkshop,
  ValidationGroup
}
