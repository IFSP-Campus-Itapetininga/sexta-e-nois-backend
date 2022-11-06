const knex = require('../../../data/connection')

module.exports = () => {
  const TABLE_NAME = 'inventory_vendor_contact'

  const create = async data => await knex.insert(data).into(TABLE_NAME)

  const list = async () => await knex.select('*').from(TABLE_NAME)

  const listByVendor = async vendorid => {
    const result = await knex.select('*').from(TABLE_NAME).where({ inventory_vendor_idinventory_vendor: vendorid })
    if (!result) { throw new Error('Address not found') }

    return result
  }

  const find = async contactid => {
    const result = await knex.select('*').from(TABLE_NAME).where({ idvendor_contact: contactid }).first().then(row => row)
    if (!result) { throw new Error('Contact not found') }

    return result
  }

  const update = async (contactid, data) => {
    await find(contactid)

    await knex.update(data).from(TABLE_NAME).where({ idvendor_contact: contactid })
  }

  const remove = async contactid => {
    await find(contactid)

    await knex.del().from(TABLE_NAME).where({ idvendor_contact: contactid })
  }

  return { create, find, update, remove, list, listByVendor }
}
