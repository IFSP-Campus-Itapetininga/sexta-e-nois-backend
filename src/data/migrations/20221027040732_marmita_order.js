/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('marmita_order', (table) => {
    table.increments('id').unsigned().primary()
    table.integer('clienteId').unsigned()

    table.double('valor_total').notNullable()
    table.tinyint('delivery').defaultTo(0)
    table.string('status').notNullable()

    table.timestamp('criadoEm').defaultTo(knex.fn.now())
    table.timestamp('alteradoEm').defaultTo(knex.fn.now())
    table.foreign('clienteId').references('marmita_cliente.id')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('marmita_order')
}
