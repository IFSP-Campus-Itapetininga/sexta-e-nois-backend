/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('tbProf', (table) => {
        table.increments('id').unsigned().primary()
        table.integer('idUsuario').unsigned()
        /*table.foreign('idUsuario').references('tbUsuario.id')*/
        table.string('especialidade').nullable()
        table.timestamp('criadoEm').defaultTo(knex.fn.now())
        table.timestamp('alteradoEm').defaultTo(knex.fn.now())
      })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('tbProf')
}
