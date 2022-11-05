/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('usuario', (table) => {
    table.increments('id').unsigned().primary()
    table.string('nome').notNullable()
    table.string('email').nullable()
    table.string('senha').nullable()
    table.integer('idPapel')
      .unsigned()
      .index()
      .references('id')
      .inTable('papel')
    table.timestamp('criadoEm').defaultTo(knex.fn.now())
    table.timestamp('alteradoEm').defaultTo(knex.fn.now())
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('usuario')
}
