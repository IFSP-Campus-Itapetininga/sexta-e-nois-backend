const dataBase = require('../../../data/connection')

module.exports = (knex = dataBase) => {
  const TABLE_NAME = 'marmita_order_products'

  const create = async (data) => await knex.insert(data).into(TABLE_NAME)

  const find = async (id) => {
    const result = await knex
      .select('*')
      .from(TABLE_NAME)
      .where({ id })
      .first()
      .then((row) => row)
    if (!result) {
      throw new Error('OrderProducts not found')
    }

    return result
  }

  const update = async (id, data) => {
    await find(id)

    await knex.update(data).from(TABLE_NAME).where({ id })
  }

  const remove = async (id) => {
    await find(id)

    await knex.del().from(TABLE_NAME).where({ id })
  }

  return { create, find, update, remove }
}
