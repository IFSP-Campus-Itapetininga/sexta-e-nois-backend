const knex = require('../../../data/connection')

module.exports = () => {
  const TABLE_NAME = 'tbAluno'

  const create = async data => await knex.insert(data).into(TABLE_NAME)

  const list = async data => knex.select('*').from(TABLE_NAME)

  const find = async id => {
    const result = await knex.select('*').from(TABLE_NAME).where({ id }).first().then(row => row)
    if (!result) { throw new Error('Aluno not found') }

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
