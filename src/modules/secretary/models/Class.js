const knex = require('../../../data/connection')

module.exports = () => {
  const TABLE_NAME = 'aula'

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
    `${TABLE_NAME}.titulo`,
    `${TABLE_NAME}.DataInicio`,
    `${TABLE_NAME}.dataTermino`,
    `${TABLE_NAME}.local`,
    `${TABLE_NAME}.descricao`,
    'chamada.id as ChamadaId',
    'chamada.matricula_id as MatriculaId',
    'chamada.data',
    'chamada.presenca'
    ).from(TABLE_NAME)
      .leftJoin('chamada', `${TABLE_NAME}.id`, 'chamada.aula_id')
      .first().then(row => row)
    if (!result) { throw new Error('Class not found') }

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
