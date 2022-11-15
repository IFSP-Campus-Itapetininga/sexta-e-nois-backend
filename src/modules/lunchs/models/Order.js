const data = require('../../../data/connection')
const Product = require('./Product')
const Client = require('./Client')

module.exports = (knex = data) => {
  const TABLE_NAME = 'marmita_order'

  const validateProducts = async (products) => {
    const productIds = products.map((item) => item.id)
    return await Product().findMany(productIds)
  }

  const create = async (data) => {
    return await knex
      .transaction(async (trx) => {
        await Client().find(data.clienteId)
        const products = await validateProducts(data.produtos)

        const total = products
          .map((item) => item.preco)
          .reduce((prev, current) => prev + current, 0)

        const id = await trx
          .insert({
            valor_total: total,
            delivery: data?.delivery ? 1 : 0,
            status: 'started',
            clienteId: data.clienteId
          })
          .into(TABLE_NAME)

        const orderProducts = data.produtos.map((item) => ({
          quantidade: item.quantidade,
          productId: item.id,
          orderId: id
        }))

        await trx.insert(orderProducts).into('marmita_order_products')
      })
      .catch((e) => {
        throw new Error(e.message)
      })
  }

  const retriveProductsFromOrder = async (ids = []) => {
    const products = await knex
      .select(
        'marmita_produto.id as produtoId',
        'marmita_order_products.orderId',
        'marmita_order_products.quantidade',
        'marmita_produto.preco',
        'marmita_produto.titulo'
      )
      .from('marmita_order_products')
      .whereIn('marmita_order_products.orderId', ids)
      .leftJoin(
        'marmita_produto',
        'marmita_produto.id',
        'marmita_order_products.productId'
      )

    const orders = {}
    for (let index = 0; index < products.length; index++) {
      const element = products[index]

      if (!orders[element.orderId]) {
        orders[element.orderId] = []
      }

      orders[element.orderId].push({
        id: element.produtoId,
        quantidade: element.quantidade,
        preco: element.preco,
        titulo: element.titulo
      })
    }

    return orders
  }

  const groupOrders = async (data) => {
    const ids = data.map((item) => item.id)

    const products = await retriveProductsFromOrder(ids)

    const orders = []

    for (let index = 0; index < data.length; index++) {
      const element = data[index]
      let produtos = []

      if (products[element.id]) {
        produtos = products[element.id]
      }

      orders.push({
        id: element.id,
        valor_total: element.valor_total,
        delivery: element.delivery === 1,
        status: element.status,
        cliente: {
          id: element.clienteId,
          nome: element.nome,
          telefone: element.telefone
        },
        produtos
      })
    }

    return orders
  }

  const retriveOrderWithProducts = () => {
    return knex
      .select(
        `${TABLE_NAME}.id`,
        `${TABLE_NAME}.valor_total`,
        `${TABLE_NAME}.delivery`,
        `${TABLE_NAME}.status`,
        'marmita_order.clienteId',
        'marmita_cliente.nome',
        'marmita_cliente.telefone'
      )
      .from(TABLE_NAME)
      .leftJoin(
        'marmita_cliente',
        'marmita_cliente.id',
        'marmita_order.clienteId'
      )
  }

  const list = async (page = 0, limit = 10, order = 'asc', filter = '') => {
    const [count, data] = await Promise.all([
      knex.from(TABLE_NAME).count(),
      retriveOrderWithProducts()
        .modify(function (queryBuilder) {
          if (filter) {
            queryBuilder.where(`${TABLE_NAME}.status`, `${filter}`)
          }
        })
        .orderBy('id', order)
        .offset(page)
        .limit(limit)
    ])

    const quantity = count[0]['count(*)']

    return {
      data: await groupOrders(data, order),
      limit,
      page: page + 1,
      totalPage: Math.ceil(quantity / limit) || 1
    }
  }

  const find = async (id) => {
    const resultRaw = await retriveOrderWithProducts()
      .where(`${TABLE_NAME}.id`, id)
      .then((row) => row)

    if (!resultRaw.length) {
      throw new Error('Order not found')
    }

    const result = await groupOrders(resultRaw)

    if (!result.length) {
      throw new Error('Order not found')
    }

    return result[0]
  }

  const update = async (id, data) => {
    await find(id)

    return await knex
      .transaction(async (trx) => {
        const products = await validateProducts(data.produtos)
        const total = products
          .map((item) => item.preco)
          .reduce((prev, current) => prev + current, 0)

        const orderProducts = data.produtos.map((item) => ({
          quantidade: item.quantidade,
          productId: item.id,
          orderId: id
        }))

        await Promise.all([
          trx
            .update({
              valor_total: total,
              delivery: data?.delivery ? 1 : 0,
              status: data?.status
            })
            .from(TABLE_NAME)
            .where({ id }),
          knex.del().from('marmita_order_products').where({ orderId: id }),
          trx.insert(orderProducts).into('marmita_order_products')
        ])
      })
      .catch((e) => {
        console.log('e:::', e)
        throw new Error(e.message)
      })
  }

  const updateStatus = async (id, data) => {
    try {
      await Promise.all([
        find(id),
        knex
          .update({
            status: data?.status
          })
          .from(TABLE_NAME)
          .where({ id })
      ])
    } catch (e) {
      console.log('e:::', e)
      throw new Error(e.message)
    }
  }

  const remove = async (id) => {
    await find(id)

    await Promise.all([
      knex.del().from('marmita_order_products').where({ orderId: id }),
      knex.del().from(TABLE_NAME).where({ id })
    ])
  }

  return { create, find, update, remove, list, updateStatus }
}
