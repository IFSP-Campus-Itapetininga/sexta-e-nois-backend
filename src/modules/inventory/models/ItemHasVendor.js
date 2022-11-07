/* eslint-disable camelcase */
const knex = require('../../../data/connection')

module.exports = () => {
  const TABLE_NAME = 'inventory_item_has_inventory_vendor'

  const create = async (iditem, vendorid, data) => {
    const exist = await find(iditem, vendorid)
    if (!exist) {
      const result = await knex.insert(data).into(TABLE_NAME)
      const response = {
        status: 201,
        // eslint-disable-next-line object-shorthand
        message: await result
      }
      return response
    } else {
      const result = {
        status: 400,
        message: 'Relationship already exists'
      }
      return result
    }
  }

  const listByItem = async inventory_item_iditem => {
    const result = await knex.select('*').from(TABLE_NAME).where(inventory_item_iditem)
    console.log(result)
    if (!result) { throw new Error('Item not found') }

    return result
  }

  const listByVendor = async inventory_vendor_idinventory_vendor => {
    const result = await knex.select('*').from(TABLE_NAME).where(inventory_vendor_idinventory_vendor)
    // console.log(result)
    if (!result) { throw new Error('Vendor not found') }

    return result
  }

  const find = async (iditem, vendorid) => {
    const result = await knex.select('*').from(TABLE_NAME).where({ inventory_item_iditem: iditem, inventory_vendor_idinventory_vendor: vendorid }).first().then(row => row)
    // if (!result) { throw new Error('ItemHasVendor not found') }

    return result
  }

  const remove = async (iditem, vendorid) => {
    await find(iditem, vendorid)

    await knex.del().from(TABLE_NAME).where({ inventory_item_iditem: iditem, inventory_vendor_idinventory_vendor: vendorid })
  }

  return {
    create, find, remove, listByItem, listByVendor
  }
}
