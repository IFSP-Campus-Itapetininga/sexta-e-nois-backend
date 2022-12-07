/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('oficina', (table) => {
    table.increments('id').unsigned().primary()
    table.string('nome').defaultTo(knex.fn.now())
    table.integer('idade_minima').notNullable()
    table.integer('idade_maxima').notNullable()
    table.string('outras_restricoes').nullable()
    table.json('atividade').nullable()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
*/
exports.down = function (knex) {
  return knex.schema.dropTable('oficina')
}
