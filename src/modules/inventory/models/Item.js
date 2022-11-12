const knex = require('../../../data/connection')

module.exports = () => {
  const TABLE_NAME = 'item'

  const create = async data => await knex.insert(data).into(TABLE_NAME)

  const list = async () => await knex.select('*').from(TABLE_NAME)

  const find = async itemid => {
    const result = await knex.select('*').from(TABLE_NAME).where({ itemid }).first().then(row => row)
    if (!result) { throw new Error('Item not found') }

    return result
  }

  const update = async (itemid, data) => {
    await find(itemid)

    await knex.update(data).from(TABLE_NAME).where({ itemid })
  }

  const getCurbal = async (itemid) => {
    await find(itemid)
    const curbal = await knex('transacao').sum('quantidade as qtd').where('item_itemid', itemid)
    return curbal
  }

  const updateCurbal = async (itemid) => {
    await find(itemid)
    const curbal = await knex('transacao').sum('quantidade as qtd').where('item_itemid', itemid)
    console.log(parseInt(curbal[0].qtd))
    await knex(TABLE_NAME).where({ itemid }).update({ saldo: curbal[0].qtd })
  }

  const remove = async itemid => {
    await find(itemid)
    await knex(TABLE_NAME).where({ itemid }).update('ativo', false)
  }

  const findInItems = async items => {
    const result = await knex.select('*').from(TABLE_NAME).whereIn('itemid', items)
    if (!result) { throw new Error('Item not found') }

    return result
  }

  const findInVendors = async vendors => {
    const result = await knex.select('*').from('fornecedor').whereIn('fornecedorid', vendors)
    if (!result) { throw new Error('Vendor not found') }

    return result
  }

  return { create, find, update, remove, list, updateCurbal, getCurbal, findInItems, findInVendors }
}
