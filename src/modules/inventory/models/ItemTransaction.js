const knex = require('../../../data/connection')

module.exports = () => {
  const TABLE_NAME = 'inventory_item_transaction'

  const create = async data => await knex.insert(data).into(TABLE_NAME)

  const list = async iditem => {
    const result = await knex.select('*').from(TABLE_NAME).where('inventory_item_iditem', iditem)
    if (!result) { throw new Error('Transactions not found') }

    return result
  }

  const find = async iditem => {
    const result = await knex.select('*').from(TABLE_NAME).where({ inventory_item_iditem: iditem }).first().then(row => row)
    if (!result) { throw new Error('ItemTransaction not found') }

    return result
  }

  // const update = async (id, data) => {
  //   await find(id)

  //   await knex.update(data).from(TABLE_NAME).where({ id })
  // }

  // const remove = async id => {
  //   await find(id)

  //   await knex.del().from(TABLE_NAME).where({ id })
  // }

  return {
    create, find, list
    //  update, remove
  }
}
