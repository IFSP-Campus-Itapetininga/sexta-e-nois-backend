/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('evento', (table) => {
    table.increments('id').unsigned().primary()
    table.string('titulo').notNullable()
    table.dateTime('dataInicio').nullable()
    table.dateTime('dataTermino').nullable()
    table.string('local').nullable()
    table.string('descricao').nullable()
    table.timestamp('criadoEm').defaultTo(knex.fn.now())
    table.timestamp('alteradoEm').defaultTo(knex.fn.now())
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('evento')
}
