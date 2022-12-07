/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('matricula', (table) => {
    table.increments('id').unsigned().primary()
    table.integer('aluno_id').unsigned()
    table.integer('turma_id').unsigned()
    table.date('data_matricula').defaultTo(knex.fn.now())
    table.foreign('aluno_id').references('aluno.id')
    table.foreign('turma_id').references('turma.id')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
*/
exports.down = function (knex) {
  return knex.schema.dropTable('matricula')
}
