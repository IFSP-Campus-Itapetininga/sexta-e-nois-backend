/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('chamada', (table) => {
    table.increments('id').unsigned().primary()
    table.integer('matricula_id').unsigned()
    table.integer('aula_id').unsigned()
    table.date('data').defaultTo(knex.fn.now())
    table.tinyint('presenca').notNullable()
    table.foreign(['matricula_id', 'aula_id']).references(['matricula.id', 'aula_id'])
  })
}

/**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
exports.down = function (knex) {
  return knex.schema.dropTable('chamada')
}
