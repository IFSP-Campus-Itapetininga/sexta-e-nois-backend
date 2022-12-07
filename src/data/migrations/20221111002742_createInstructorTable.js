/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('instrutor', (table) => {
    table.increments('id').unsigned().primary()
    table.string('nome').defaultTo(knex.fn.now())
    table.string('cpf').notNullable()
    table.string('email').notNullable()
    table.json('atividade').notNullable()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('instrutor')
}
