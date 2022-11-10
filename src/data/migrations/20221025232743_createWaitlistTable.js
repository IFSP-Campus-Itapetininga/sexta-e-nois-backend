/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('lista_espera', (table) => {
    table.increments('id').unsigned().primary()
    table.string('nome').notNullable()
    table.tinyint('alfabetizado').nullable()
    table.string('escolaridade').nullable()
    table.string('oficina').nullable()
    table.dateTime('dataNascimento').nullable()
    table.dateTime('dataCadastro').defaultTo(knex.fn.now())
    table.string('nomeResponsavel').nullable()
    table.string('telefone').nullable()
  })
}
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('lista_espera')
}
