/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('endereco_responsavel', (table) => {
    table.increments('id').unsigned().primary()
    table.integer('responsavel_endereco_id').unsigned()
    table.string('cep').notNullable()
    table.string('logradouro').notNullable()
    table.integer('numero').notNullable()
    table.string('complemento').notNullable()
    table.string('bairro').notNullable()
    table.string('cidade').notNullable()
    table.string('uf').notNullable()
    table.foreign('responsavel_endereco_id').references('responsavel_aluno.id')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
*/
exports.down = function (knex) {
  return knex.schema.dropTable('endereco_responsavel')
}
