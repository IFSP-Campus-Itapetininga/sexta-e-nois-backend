/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('tb_resp', (table) => {
        table.increments('id').unsigned().primary()
        table.integer('id_quest').unsigned()
        table.foreign('id_quest').references('tb_quest.id')
        table.integer('id_aluno').unsigned()
        table.foreign('id_aluno').references('tb_aluno.id')
        table.integer('id_prof').unsigned()
        table.foreign('id_prof').references('tb_prof.id')
        table.string('resposta').nullable()
        table.timestamp('criadoEm').defaultTo(knex.fn.now())
        table.timestamp('alteradoEm').defaultTo(knex.fn.now())
      })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('tb_resp')
}
