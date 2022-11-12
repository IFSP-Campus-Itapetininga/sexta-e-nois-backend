const knex = require('../../../data/connection')

module.exports = () => {
  const TABLE_NAME = 'endereco'

  const create = async data => await knex.insert(data).into(TABLE_NAME)

  const list = async () => await knex.select('*').from(TABLE_NAME)

  const listByVendor = async fornecedorid => {
    const result = await knex.select('*').from(TABLE_NAME).where({ fornecedor_fornecedorid: fornecedorid })
    if (!result) { throw new Error('Address not found') }

    return result
  }

  const find = async enderecoid => {
    const result = await knex.select('*').from(TABLE_NAME).where({ enderecoid }).first().then(row => row)
    if (!result) { throw new Error('Address not found') }

    return result
  }

  const update = async (enderecoid, data) => {
    await find(enderecoid)

    await knex.update(data).from(TABLE_NAME).where({ enderecoid })
  }

  const remove = async enderecoid => {
    await find(enderecoid)

    await knex.del().from(TABLE_NAME).where({ enderecoid })
  }

  return { create, find, update, remove, list, listByVendor }
}
