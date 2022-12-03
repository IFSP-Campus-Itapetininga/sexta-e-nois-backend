const knex = require('../../../data/connection')

module.exports = () => {
  const TABLE_NAME = 'matricula'

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
    `${TABLE_NAME}.data_matricula`,
    'aluno.id as AlunoId',
    'aluno.cpf',
    'aluno.nome',
    'aluno.data_nascimento',
    'turma.id as TurmaId',
    'turma.oficina_id',
    'turma.oficineiro_id',
    'turma.horario',
    'turma.vagas'
    ).from(TABLE_NAME)
      .innerJoin('aluno', `${TABLE_NAME}.aluno_id`, 'aluno.id')
      .innerJoin('turma', `${TABLE_NAME}.turma_id`, 'turma.id')
      .first().then(row => row)
    if (!result) { throw new Error('Registration not found') }

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
