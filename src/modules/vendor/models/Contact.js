const knex = require('../../../data/connection')

module.exports = () => {
  const TABLE_NAME = 'contato'

  const create = async data => await knex.insert(data).into(TABLE_NAME)

  const list = async () => await knex.select('*').from(TABLE_NAME)

  const listByVendor = async fornecedorid => {
    const result = await knex.select('*').from(TABLE_NAME).where({ fornecedor_fornecedorid: fornecedorid })
    if (!result) { throw new Error('Address not found') }

    return result
  }

  const find = async contatoid => {
    const result = await knex.select('*').from(TABLE_NAME).where({ contatoid }).first().then(row => row)
    if (!result) { throw new Error('Contact not found') }

    return result
  }

  const update = async (contatoid, data) => {
    await find(contatoid)

    await knex.update(data).from(TABLE_NAME).where({ contatoid })
  }

  const remove = async contatoid => {
    await find(contatoid)

    await knex.del().from(TABLE_NAME).where({ contatoid })
  }

  return { create, find, update, remove, list, listByVendor }
}
