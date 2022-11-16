/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('tbAluno', (table) => {
    table.increments('id').unsigned().primary()
    table.integer('idUsuario').unsigned()
    table.foreign('idUsuario').references('tbUsuario.id')
    table.string('motivoAtend')
    table.timestamp('criadoEm').defaultTo(knex.fn.now())
    table.timestamp('alteradoEm').defaultTo(knex.fn.now())
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('tbAluno')
}


/** a linha do foreing está dando erro
 * fazer um comentario antes de executar o migrate
 * e depois voltar tirar o comentario e fazer migrate novamente.
 * 
 */