/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('papel').del()
  await knex('papel').insert([
    { id: 1, nome: 'Administrador' },
    { id: 2, nome: 'Secretário' },
    { id: 3, nome: 'Instrutor' },
    { id: 4, nome: 'Almoxarife' },
    { id: 5, nome: 'Resp. Evento' },
    { id: 6, nome: 'Aluno' }
  ])
}
