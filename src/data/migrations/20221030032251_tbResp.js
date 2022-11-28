/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('resposta', (table) => {
        table.increments('id').unsigned().primary()
        table.integer('idQuest').unsigned()
        table.foreign('idQuest').references('tbQuest.id')
        //table.integer('idAluno').unsigned()
        //table.foreign('idAluno').references('tbAluno.id')
        //table.integer('idProf').unsigned()
        //table.foreign('idProf').references('tbProf.id')
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
  return knex.schema.dropTable('tbResp')
}
