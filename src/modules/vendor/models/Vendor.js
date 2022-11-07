const knex = require('../../../data/connection')

module.exports = () => {
  const TABLE_NAME = 'inventory_vendor'

  const create = async data => await knex.insert(data).into(TABLE_NAME)

  const list = async () => await knex.select('*').from(TABLE_NAME)

  const find = async vendorid => {
    const result = await knex.select('*').from(TABLE_NAME).where({ idinventory_vendor: vendorid }).first().then(row => row)
    if (!result) { throw new Error('Vendor not found') }
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

  const findin = async vendors => {
    const result = await knex.select('*').from(TABLE_NAME).whereIn('idinventory_vendor', vendors)
    console.log(result)
    if (!result) { throw new Error('Item not found') }

    return result
  }

  return { create, find, update, remove, list, findin }
}
