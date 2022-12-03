const knex = require('../../../data/connection')

module.exports = () => {
  const TABLE_NAME = 'instrutor'

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
    `${TABLE_NAME}.nome`,
    `${TABLE_NAME}.cpf`,
    `${TABLE_NAME}.email`,
    `${TABLE_NAME}.atividade`,
    'turma.id as turmaId',
    'turma.horario',
    'turma.vagas',
    'oficina.id, oficina.id',
    'oficina.id',
    'oficina.nome',
    'oficina.idade_minima',
    'oficina.idade_maxima',
    'oficina.outras_restricoes',
    'oficina.atividade'
    ).from(TABLE_NAME)
      .innerJoin('turma', `${TABLE_NAME}.id`, 'turma.oficineiro_id')
      .select('oficina', 'turma.oficina_id', 'oficina.id')
      .first().then(row => row)
    if (!result) { throw new Error('Instructor not found') }

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
