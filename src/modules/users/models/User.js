const knex = require('../../../data/connection')

module.exports = () => {
  const TABLE_NAME = 'usuario'

  const create = async data => await knex.insert(data).into(TABLE_NAME).then(([id]) => id)

  const list = async () => await knex.select('id', 'nome', 'nomeUsuario', 'idPapel', 'criadoEm', 'alteradoEm').from(TABLE_NAME)

  const findById = async id => {
    const result = await knex.select('id', 'nome', 'nomeUsuario', 'idPapel', 'criadoEm', 'alteradoEm').from(TABLE_NAME).where({ id }).first().then(row => row)
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
