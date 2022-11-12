/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('fornecedor', (table) => {
    table.increments('fornecedorid').unsigned().primary()
    table.string('fornecedor').notNullable()
    table.string('descricao')
    table.string('cnpj')
  })
}
/**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
exports.down = function (knex) {
  return knex.schema.dropTable('fornecedor')
}
