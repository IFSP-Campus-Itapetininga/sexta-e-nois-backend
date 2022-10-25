const knex = require('../../../data/connection')

module.exports = () => {
  const TABLE_NAME = 'item'

  const create = async data => await knex.insert(data).into(TABLE_NAME)

  const list = async () => await knex.select('*').from(TABLE_NAME)

  const find = async iditem => {
    const result = await knex.select('*').from(TABLE_NAME).where({ iditem }).first().then(row => row)
    if (!result) { throw new Error('Item not found') }

    return result
  }

  const update = async (iditem, data) => {
    await find(iditem)

    await knex.update(data).from(TABLE_NAME).where({ iditem })
  }

  const updateLastPurchase = async (iditem, lastPurchase) => {
    await find(iditem)

    await knex(TABLE_NAME).where({ iditem }).update({ lastPurchase })
  }

  const updateCurbal = async (iditem, lastPurchase) => {
    await find(iditem)

    const curbal = await knex('item_transaction').sum('quantity as qtd').where('iditem_fk', iditem)
    console.log(curbal[0].qtd)

    await knex(TABLE_NAME).where({ iditem }).update({ curbal: curbal[0].qtd })
  }

  const remove = async iditem => {
    await find(iditem)
    await knex(TABLE_NAME).where({ iditem }).update('active', false)

    // await knex.del().from(TABLE_NAME).where({ iditem })
  }

  return { create, find, update, remove, list, updateLastPurchase, updateCurbal }
}
