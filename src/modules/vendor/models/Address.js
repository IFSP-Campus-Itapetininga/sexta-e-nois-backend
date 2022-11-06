const knex = require('../../../data/connection')

module.exports = () => {
  const TABLE_NAME = 'inventory_address'

  const create = async data => await knex.insert(data).into(TABLE_NAME)

  const list = async () => await knex.select('*').from(TABLE_NAME)

  const listByVendor = async vendorid => {
    const result = await knex.select('*').from(TABLE_NAME).where({ inventory_vendor_idinventory_vendor: vendorid })
    if (!result) { throw new Error('Address not found') }

    return result
  }

  const find = async addressid => {
    const result = await knex.select('*').from(TABLE_NAME).where({ idinventory_address: addressid }).first().then(row => row)
    if (!result) { throw new Error('Address not found') }

    return result
  }

  const update = async (addressid, data) => {
    await find(addressid)

    await knex.update(data).from(TABLE_NAME).where({ idinventory_address: addressid })
  }

  const remove = async addressid => {
    await find(addressid)

    await knex.del().from(TABLE_NAME).where({ idinventory_address: addressid })
  }

  return { create, find, update, remove, list, listByVendor }
}
