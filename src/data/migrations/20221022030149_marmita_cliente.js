/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('marmita_cliente', (table) => {
    table.increments('id').unsigned().primary()
    table.string('nome').notNullable()
    table.string('telefone').notNullable().unique()
    table.string('rua')
    table.string('numero')
    table.string('bairro')
    table.timestamp('criadoEm').defaultTo(knex.fn.now())
    table.timestamp('alteradoEm').defaultTo(knex.fn.now())
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('marmita_cliente')
}
