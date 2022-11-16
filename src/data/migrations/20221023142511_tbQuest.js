/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('tbQuest', (table) => {
    table.increments('id').unsigned().primary()
    table.integer('idGrp').unsigned()
    table.foreign('idGrp').references('tbGrp.id')
    table.string('pergunta').nullable()
    table.timestamp('criadoEm').defaultTo(knex.fn.now())
    table.timestamp('alteradoEm').defaultTo(knex.fn.now())
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('tbQuest')
}
