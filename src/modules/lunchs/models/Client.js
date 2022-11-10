const knex = require('../../../data/connection')

module.exports = () => {
  const TABLE_NAME = 'marmita_cliente'

  /**
   *
   * @param {*} data
   * @returns
   */
  const create = async (data) =>
    await knex
      .insert(data)
      .into(TABLE_NAME)
      .then(([id]) => id)

  /**
   *
   * @param {number} page
   * @param {number} limit
   */
  const list = async (page = 0, limit = 10, search) => {
    const [count, data] = await Promise.all([
      knex.from(TABLE_NAME).count(),
      knex
        .select('*')
        .from(TABLE_NAME)
        .modify(function (queryBuilder) {
          if (!!search) {
            const serchType = /^[0-9]*$/g.test(search) ? 'telefone' : 'nome'

            queryBuilder.where(serchType, 'LIKE', `%${search}%`)
          }
        })
        .offset(page)
        .limit(limit)
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
   * @param {number} id
   * @returns {*}
   */
  const findByPhone = async (phone) => {
    const result = await knex
      .select('*')
      .from(TABLE_NAME)
      .where({ telefone: phone })
      .first()
      .then((row) => row)

    return result
  }

  /**
   *
   * @param {number} id
   * @param {*} data
   */
  const update = async (id, data) => {
    const cliente = await find(id)

    data.telefone = cliente.telefone

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

  return { create, find, update, remove, list, findByPhone }
}
