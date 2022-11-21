/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('responsavel_aluno', (table) => {
    table.increments('id').unsigned().primary()
    table.string('cpf').notNullable()
    table.string('nome').notNullable()
    table.date('data_nascimento').notNullable()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('responsavel_aluno')
}
