const knex = require('../../../data/connection')

module.exports = () => {
  const TABLE_NAME = 'transacao'

  const create = async data => await knex.insert(data).into(TABLE_NAME)

  const list = async itemid => {
    const result = await knex.select('*').from(TABLE_NAME).where('item_itemid', itemid)
    if (!result) { throw new Error('Transactions not found') }

    return result
  }

  const listAll = async () => {
    const result = await knex.select('transacao.*', 'item.descricao').from(TABLE_NAME).join('item', { 'item.itemid': 'transacao.item_itemid' })
    if (!result[0]) { throw new Error('Transactions not found') }

    return result
  }

  const find = async itemid => {
    const result = await knex.select('*').from(TABLE_NAME).where({ item_itemid: itemid }).first().then(row => row)
    if (!result) { throw new Error('ItemTransaction not found') }

    return result
  }
  return {
    create, find, list, listAll
  }
}
