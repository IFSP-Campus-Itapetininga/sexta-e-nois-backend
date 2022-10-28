const knex = require('../../../data/connection')

module.exports = () => {
  const TABLE_NAME = 'marmita_produto'

  /**
   *
   * @param {*} data
   * @returns
   */
  const create = async (data) => await knex.insert(data).into(TABLE_NAME)

  /**
   *
   * @param {number} page
   * @param {number} limit
   */
  const list = async (page = 0, limit = 10) => {
    const [count, data] = await Promise.all([
      knex.from(TABLE_NAME).count(),
      knex.select('*').from(TABLE_NAME).offset(page).limit(limit)
    ])

    const quantity = count[0]['count(*)']

    return {
      data,
      limit,
      page: page + 1,
      totalPage: Math.ceil(quantity / limit) || 1
    }
  }

  /**
   *
   * @param {number} id
   * @returns {*}
   */
  const find = async (id) => {
    const result = await knex
      .select('*')
      .from(TABLE_NAME)
      .where({ id })
      .first()
      .then((row) => row)
    if (!result) {
      throw new Error('Product not found')
    }

    return result
  }

  /**
   *
   * @param {string} name
   * @returns {*}
   */
  const search = async (name) => {
    const result = await knex
      .select('*')
      .from(TABLE_NAME)
      .where('titulo', 'LIKE', `%${name}%`)
      .first()
      .then((row) => row)

    if (!result) {
      throw new Error('Product not found')
    }

    return result
  }

  /**
   *
   * @param {number} id
   * @param {*} data
   */
  const update = async (id, data) => {
    await find(id)

    await knex.update(data).from(TABLE_NAME).where({ id })
  }

  /**
   *
   * @param {number} id
   */
  const remove = async (id) => {
    await find(id)

    await knex.del().from(TABLE_NAME).where({ id })
  }

  return { create, find, update, remove, list, search }
}
