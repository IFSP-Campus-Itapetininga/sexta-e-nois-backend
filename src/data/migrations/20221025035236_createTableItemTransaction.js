/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('item_transaction', (table) => {
    table.increments('transactionid').unsigned().primary()
    table.decimal('quantity').notNullable()
    table.string('user').notNullable()
    table.dateTime('transdate').nullable().defaultTo(knex.fn.now())
    table.string('memo')
    table.integer('iditem_fk').unsigned().references('iditem').inTable('item')
  })
}
/**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
exports.down = function (knex) {
  return knex.schema.dropTable('item_transaction')
}
