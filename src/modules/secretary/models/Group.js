const knex = require('../../../data/connection')

module.exports = () => {
  const TABLE_NAME = 'turma'

  const create = async data => await knex.insert(data).into(TABLE_NAME)

  const list = async (page = 0, limit = 10) => {
    const [count, data] = await Promise.all([
      knex.from(TABLE_NAME).count(),
      knex.select('*').from(TABLE_NAME).offset(page).limit(limit)
    ])

    const quantity = count[0]['count(*)']

    return {
      data,
      limit,
      page: page + 1,
      totalPage: Math.ceil(quantity / limit) || 1
    }
  }

  const find = async id => {
    const result = await knex.select(`${TABLE_NAME}.id`,
    `${TABLE_NAME}.horario`,
    `${TABLE_NAME}.vagas`,
    'instrutor.id as OficineiroId',
    'instrutor.nome as OficineiroNome',
    'instrutor.cpf as OficineiroCpf',
    'instrutor.email as OficineiroEmail',
    'instrutor.atividade as OficineiroAtividade',
    'oficina.id as OficinaId',
    'oficina.nome as OficinaNome',
    'oficina.idade_minima',
    'oficina.idade_maxima',
    'oficina.outras_restricoes',
    'oficina.atividade'
    ).from(TABLE_NAME)
      .innerJoin('instrutor', `${TABLE_NAME}.oficineiro_id`, 'instrutor.id')
      .innerJoin('oficina', `${TABLE_NAME}.oficina_id`, 'oficina.id')
      .first().then(row => row)
    if (!result) { throw new Error('Registration not found') }

    return result
  }

  const update = async (id, data) => {
    await find(id)

    await knex.update(data).from(TABLE_NAME).where({ id })
  }

  const remove = async id => {
    await find(id)

    await knex.del().from(TABLE_NAME).where({ id })
  }

  return { create, find, update, remove, list }
}
