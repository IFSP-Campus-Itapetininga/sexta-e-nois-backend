/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('usuario', table => {
    table.dropColumn('cpf')
    table.dropColumn('email')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable('usuario', table => {
    table.string('cpf').after('nome')
    table.string('email').after('cpf')
  })
}
