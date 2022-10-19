module.exports = ({
  knex = require('../../../config/database'),
  tableName = 'evento'
}) => {
  const create = data => knex.insert(data).into(tableName)

  const list = () => knex.select('*').from(tableName)

  const find = id => knex.select('*').from(tableName).where({ id })

  const update = (id, data) => knex.update(data).from(tableName).where({ id })

  const remove = id => knex.del().from(tableName).where({ id })

  return { create, find, update, remove, list }
}
