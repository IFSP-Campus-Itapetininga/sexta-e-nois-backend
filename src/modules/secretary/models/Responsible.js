const knex = require('../../../data/connection')

module.exports = () => {
  const TABLE_NAME = 'responsavel_aluno'

  const create = async data => await knex.insert(data).into(TABLE_NAME)

  const list = async (page = 0, limit = 10) => {
    const [count, data] = await Promise.all([
      knex.from(TABLE_NAME).count(),
      knex.select('*').from(TABLE_NAME).offset(page).limit(limit)
    ])

    const quantity = count[0]['count(*)']

    return {
      data,
      limit,
      page: page + 1,
      totalPage: Math.ceil(quantity / limit) || 1
    }
  }

  const find = async id => {
    const result = await knex.select(`${TABLE_NAME}.id`,
    `${TABLE_NAME}.cpf`,
    `${TABLE_NAME}.nome`,
    `${TABLE_NAME}.data_nascimento`,
    'aluno.id as alunoId',
    'aluno.cpf as alunoCpf',
    'aluno.nome as alunoNome',
    'aluno.data_nascimento as alunoDataNascimento',
    'telefone_responsavel.ddd',
    'telefone_responsavel.numero',
    'telefone_responsavel.tipo',
    'endereco_responsavel.cep',
    'endereco_responsavel.logradouro',
    'endereco_responsavel.numero',
    'endereco_responsavel.complemento',
    'endereco_responsavel.bairro',
    'endereco_responsavel.cidade',
    'endereco_responsavel.uf'
    ).from(TABLE_NAME)
      .innerJoin('aluno', `${TABLE_NAME}.id`, 'aluno.responsavel_aluno_id')
      .innerJoin('telefone_responsavel', `${TABLE_NAME}.id`, 'telefone_responsavel.responsavel_telefone_id')
      .innerJoin('endereco_responsavel', `${TABLE_NAME}.id`, 'endereco_responsavel.responsavel_endereco_id')
      .first().then(row => row)
    if (!result) { throw new Error('Responsible not found') }

    return result
  }

  const update = async (id, data) => {
    await find(id)

    await knex.update(data).from(TABLE_NAME).where({ id })
  }

  const remove = async id => {
    await find(id)

    await knex.del().from(TABLE_NAME).where({ id })
  }

  return { create, find, update, remove, list }
}
