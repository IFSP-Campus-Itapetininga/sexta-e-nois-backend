const knex = require('../../../data/connection')

module.exports = () => {
  const TABLE_NAME = 'telefone_responsavel'

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
    `${TABLE_NAME}.ddd`,
    `${TABLE_NAME}.numero`,
    `${TABLE_NAME}.tipo`,
    'responsavel_aluno.id as ResponsavelId',
    'responsavel_aluno.cpf',
    'responsavel_aluno.nome',
    'responsavel_aluno.data_nascimento'
    ).from(TABLE_NAME)
      .innerJoin('responsavel_aluno', `${TABLE_NAME}.responsavel_telefone_id`, 'telefone_responsavel.id')
      .first().then(row => row)
    if (!result) { throw new Error('Phone not found') }

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
