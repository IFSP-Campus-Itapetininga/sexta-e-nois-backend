/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
return knex.schema.createTable('tb_usuario', (table) => {
    table.increments('id').unsigned().primary()
    table.string('nome').notNullable()

    table.index(['nome'], 'idx_nome', {
        storageEngineIndexType: 'hash',})

    table.string('tipo').notNullable()
    table.timestamp('criadoEm').defaultTo(knex.fn.now())
    table.timestamp('alteradoEm').defaultTo(knex.fn.now())
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('tb_usuario')
}
