/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('marmita_order_products', (table) => {
    table.increments('id').unsigned().primary()
    table.integer('quantidade').notNullable()

    table.integer('productId').unsigned()
    table.integer('orderId').unsigned()

    table.timestamp('criadoEm').defaultTo(knex.fn.now())
    table.timestamp('alteradoEm').defaultTo(knex.fn.now())

    table.foreign('productId').references('marmita_produto.id')
    table.foreign('orderId').references('marmita_order.id')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('marmita_order_products')
}
