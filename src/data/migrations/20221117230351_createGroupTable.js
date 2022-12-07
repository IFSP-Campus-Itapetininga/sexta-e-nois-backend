/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('turma', (table) => {
    table.increments('id').unsigned().primary()
    table.integer('oficina_id').unsigned()
    table.integer('oficineiro_id').unsigned()
    table.time('horario').nullable()
    table.integer('vagas').notNullable()
    table.foreign('oficina_id').references('oficina.id')
    table.foreign('oficineiro_id').references('instrutor.id')
  })
}

/**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
exports.down = function (knex) {
  return knex.schema.dropTable('turma')
}
