/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('aluno', (table) => {
    table.increments('id').unsigned().primary()
    table.integer('responsavel_aluno_id').unsigned()
    table.string('cpf').notNullable()
    table.string('nome').notNullable()
    table.date('data_nascimento').notNullable()
    table.foreign('responsavel_aluno_id').references('responsavel_aluno.id')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
*/
exports.down = function (knex) {
  return knex.schema.dropTable('aluno')
}
