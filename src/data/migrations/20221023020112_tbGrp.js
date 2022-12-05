/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('grupo', (table) => {
        table.increments('id').unsigned().primary()
        //table.integer('idProf').unsigned()
        //table.foreign('idProf').references('tbProf.id')
        table.string('descricao').nullable()
        table.timestamp('criadoEm').defaultTo(knex.fn.now())
        table.timestamp('alteradoEm').defaultTo(knex.fn.now())
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('grupo')
};
