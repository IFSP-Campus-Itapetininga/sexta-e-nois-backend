/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('tb_perg', (table) => {
    table.increments('id').unsigned().primary()
    table.integer('id_prof').unsigned()
    table.foreign('id_prof').references('tb_prof.id')
    table.integer('id_grp').unsigned()
    table.foreign('id_grp').references('tb_grp.id')
    table.string('descricao').nullable()
    table.timestamp('criadoEm').defaultTo(knex.fn.now())
    table.timestamp('alteradoEm').defaultTo(knex.fn.now())
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('tb_perg')
}
