/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('transacao', (table) => {
    table.increments('transacaoid').unsigned().primary()
    table.decimal('quantidade').notNullable()
    table.string('usuario').notNullable()
    table.dateTime('datatransacao').nullable().defaultTo(knex.fn.now())
    table.string('memo')
    table.integer('item_itemid')
      .unsigned()
      .references('itemid')
      .inTable('item')
      .onDelete('SET NULL')
  })
}
/**
     * @param { import("knex").Knex } knex
     * @returns { Promise<void> }
     */
exports.down = function (knex) {
  return knex.schema.dropTable('transacao')
}
