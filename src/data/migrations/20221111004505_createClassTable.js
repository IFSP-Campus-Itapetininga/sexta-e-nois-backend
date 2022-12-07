/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('aula', (table) => {
    table.increments('id').unsigned().primary()
    table.string('titulo').notNullable()
    table.dateTime('dataInicio').nullable()
    table.dateTime('dataTermino').nullable()
    table.string('local').nullable()
    table.string('descricao').nullable()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('aula')
}
