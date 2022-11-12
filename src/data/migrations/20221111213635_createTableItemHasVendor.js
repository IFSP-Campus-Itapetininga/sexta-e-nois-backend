/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('item_has_fornecedor', (table) => {
    table.integer('item_itemid').unsigned().references('itemid').inTable('item').notNullable()
    table.integer('fornecedor_fornecedorid')
      .unsigned()
      .references('fornecedorid')
      .inTable('fornecedor')
      .notNullable()
      .onDelete('SET NULL')
  })
}
/**
     * @param { import("knex")
     *   .Knex } knex
     * @returns { Promise<void> }
     */
exports.down = function (knex) {
  return knex.schema.dropTable('item_has_fornecedor')
}
