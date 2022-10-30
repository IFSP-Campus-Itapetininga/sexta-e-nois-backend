/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('tb_aluno', (table) => {
    table.increments('id').unsigned().primary()
    table.integer('id_usuario').unsigned()
    table.foreign('id_usuario').references('tb_usuario.id')
    table.string('motivo_atend')
    table.timestamp('criadoEm').defaultTo(knex.fn.now())
    table.timestamp('alteradoEm').defaultTo(knex.fn.now())
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('tb_aluno')
}
