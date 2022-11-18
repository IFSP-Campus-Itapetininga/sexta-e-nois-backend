/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('usuario').del()
  await knex('usuario').insert([
    {
      id: 1,
      nome: 'Administrador',
      nomeUsuario: 'admin001',
      senha: process.env.ADMIN_PASSWORD,
      idPapel: 1
    }
  ])
}
