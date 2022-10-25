/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('item', (table) => {
    table.increments('iditem').unsigned().primary()
    table.string('description').notNullable()
    table.boolean('active').notNullable()
    table.decimal('curbal').notNullable()
    table.dateTime('lastPurchase').nullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('item')
}
