/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('telefone_responsavel', (table) => {
    table.increments('id').unsigned().primary()
    table.integer('responsavel_telefone_id').unsigned()
    table.string('ddd').notNullable()
    table.string('numero').notNullable()
    table.string('tipo').notNullable()
    table.foreign('responsavel_telefone_id').references('responsavel_aluno.id')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
*/
exports.down = function (knex) {
  return knex.schema.dropTable('telefone_responsavel')
}
