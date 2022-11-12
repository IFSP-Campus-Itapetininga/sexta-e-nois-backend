/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('item', (table) => {
    table.increments('itemid').unsigned().primary()
    table.string('descricao').notNullable()
    table.boolean('ativo').notNullable()
    table.decimal('saldo').notNullable()
  })
}

/**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
exports.down = function (knex) {
  return knex.schema.dropTable('item')
}
