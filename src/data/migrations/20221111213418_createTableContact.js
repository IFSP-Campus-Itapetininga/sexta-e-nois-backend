/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('contatoFornecedor', (table) => {
    table.increments('contatoid').unsigned().primary()
    table.string('nome').notNullable()
    table.string('email')
    table.string('telefone')
    table.tinyint('whatsapp')
    table.string('funcao')
    table.integer('fornecedor_fornecedorid')
      .unsigned()
      .references('fornecedorid')
      .inTable('fornecedor')
      .onDelete('CASCADE')
  })
}
/**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
exports.down = function (knex) {
  return knex.schema.dropTable('contatoFornecedor')
}
