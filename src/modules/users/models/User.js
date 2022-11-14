const knex = require('../../../data/connection')

module.exports = () => {
  const TABLE_NAME = 'usuario'

  const create = async data => await knex.insert(data).into(TABLE_NAME).then(([id]) => id)

  const list = async (page = 0, limit = 10) => {
    const [count, data] = await Promise.all([
      knex.from(TABLE_NAME).count(),
      knex.select('id', 'nome', 'nomeUsuario', 'idPapel', 'criadoEm', 'alteradoEm').from(TABLE_NAME).offset(page).limit(limit)
    ])

    const quantity = count[0]['count(*)']

    return {
      data,
      limit,
      page: page + 1,
      totalPage: Math.ceil(quantity / limit) || 1
    }
  }

  const findById = async id => {
    const result = await knex.select('id', 'nome', 'idPapel', 'criadoEm', 'alteradoEm').from(TABLE_NAME).where({ id }).first().then(row => row)
    if (!result) { throw new Error('User not found') }

    return result
  }

  const findByUsername = async (username) => {
    const result = await knex
      .select(
      `${TABLE_NAME}.id`,
      `${TABLE_NAME}.nome`,
      `${TABLE_NAME}.nomeUsuario`,
      `${TABLE_NAME}.senha`,
      `${TABLE_NAME}.idPapel`,
      'papel.nome as nomePapel'
      )
      .from(TABLE_NAME)
      .leftJoin(
        'papel',
      `${TABLE_NAME}.idPapel`,
      'papel.id'
      )
      .where({ 'usuario.nomeUsuario': username })
      .first()
      .then(row => row)
    if (!result) { throw new Error('User not found') }

    return result
  }

  const update = async (id, data) => {
    await findById(id)

    await knex.update(data).from(TABLE_NAME).where({ id })
  }

  const remove = async id => {
    await findById(id)

    await knex.del().from(TABLE_NAME).where({ id })
  }

  return { create, findById, findByUsername, update, remove, list }
}
