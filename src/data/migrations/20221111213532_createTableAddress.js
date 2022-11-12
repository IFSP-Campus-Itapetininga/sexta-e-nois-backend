/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('endereco', (table) => {
    table.increments('enderecoid').unsigned().primary()
    table.string('rua').notNullable()
    table.integer('numero').notNullable()
    table.string('estado').notNullable()
    table.string('cidade').notNullable()
    table.string('cep').notNullable()
    table.string('bairro').notNullable()
    table.string('complemento')
    table.integer('fornecedor_fornecedorid')
      .unsigned()
      .references('fornecedorid')
      .inTable('fornecedor')
      .notNullable()
      .onDelete('SET NULL')
  })
}
/**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
exports.down = function (knex) {
  return knex.schema.dropTable('endereco')
}
