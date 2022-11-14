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
      senha: '$2a$12$FM1lVPdMgQzYmPu8T8oqIebElMhz2TwiCYzO5z24RM20bMccT6gTu', // password = 123; NÃO USAR este usuário em produção; apenas para testes; apagar este arquivo ao final do projeto.
      idPapel: 1
    }
  ])
}
