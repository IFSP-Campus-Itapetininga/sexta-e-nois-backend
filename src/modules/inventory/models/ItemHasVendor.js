/* eslint-disable camelcase */
const knex = require('../../../data/connection')

module.exports = () => {
  const TABLE_NAME = 'item_has_fornecedor'

  const create = async (itemid, fornecedorid, data) => {
    const exist = await find(itemid, fornecedorid)
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

  const listByItem = async item_itemid => {
    const result = await knex.select('*').from(TABLE_NAME).where(item_itemid)
    console.log(result)
    if (!result) { throw new Error('Item not found') }

    return result
  }

  const listByVendor = async fornecedor_fornecedorid => {
    const result = await knex.select('*').from(TABLE_NAME).where(fornecedor_fornecedorid)
    // console.log(result)
    if (!result) { throw new Error('Vendor not found') }

    return result
  }

  const find = async (itemid, fornecedorid) => {
    const result = await knex.select('*').from(TABLE_NAME).where({ item_itemid: itemid, fornecedor_fornecedorid: fornecedorid }).first().then(row => row)
    // if (!result) { throw new Error('ItemHasVendor not found') }

    return result
  }

  const remove = async (itemid, fornecedorid) => {
    await find(itemid, fornecedorid)

    await knex.del().from(TABLE_NAME).where({ item_itemid: itemid, fornecedor_fornecedorid: fornecedorid })
  }

  return {
    create, find, remove, listByItem, listByVendor
  }
}
