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

  const groupOrders = (data, order = 'asc') => {
    const orders = {}

    for (let index = 0; index < data.length; index++) {
      const element = data[index]

      if (!orders[element.id]) {
        orders[element.id] = {
          id: element.id,
          valor_total: element.valor_total,
          delivery: element.delivery === 1,
          status: element.status,
          cliente: {
            id: element.clienteId,
            nome: element.nome,
            telefone: element.telefone
          },
          produtos: []
        }
      }

      orders[element.id].produtos.push({
        id: element.produtoId,
        quantidade: element.quantidade,
        preco: element.preco
      })
    }

    const rows = Object.entries(orders).map((item) => item[1])

    if (order !== 'asc') {
      return rows.sort((prev, current) => {
        if (prev?.id > current?.id) return -1
        if (prev?.id < current?.id) return 1

        return 0
      })
    }

    return rows
  }

  const retriveOrderWithProducts = () => {
    return knex
      .select(
        `${TABLE_NAME}.id`,
        `${TABLE_NAME}.valor_total`,
        `${TABLE_NAME}.delivery`,
        `${TABLE_NAME}.status`,
        'marmita_produto.id as produtoId',
        'marmita_order_products.quantidade',
        'marmita_produto.preco',
        'marmita_order.clienteId',
        'marmita_cliente.nome',
        'marmita_cliente.telefone'
      )
      .from(TABLE_NAME)
      .leftJoin(
        'marmita_order_products',
        `${TABLE_NAME}.id`,
        'marmita_order_products.orderId'
      )
      .leftJoin(
        'marmita_produto',
        'marmita_produto.id',
        'marmita_order_products.productId'
      )
      .leftJoin(
        'marmita_cliente',
        'marmita_cliente.id',
        'marmita_order.clienteId'
      )
  }

  const list = async (page = 0, limit = 10, order = 'asc') => {
    const [count, data] = await Promise.all([
      knex.from(TABLE_NAME).count(),
      retriveOrderWithProducts().offset(page).limit(limit)
    ])

    const quantity = count[0]['count(*)']

    return {
      data: groupOrders(data, order),
      limit,
      page: page + 1,
      totalPage: Math.ceil(quantity / limit) || 1
    }
  }

  const find = async (id) => {
    const resultRaw = await retriveOrderWithProducts()
      .where(`${TABLE_NAME}.id`, id)
      .then((row) => row)

    if (!resultRaw) {
      throw new Error('Order not found')
    }

    const result = groupOrders(resultRaw)

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
