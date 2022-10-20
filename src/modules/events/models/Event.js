module.exports = ({
  knex = require('../../../config/database'),
  tableName = 'evento'
}) => {
  const TABLE_NAME = 'eventos';

  const create = data => knex.insert(data).into(TABLE_NAME)

  const list = () => knex.select('*').from(tableName)

  const find = id => knex.select('*').from(tableName).where({ id })

  const update = (id, data) => knex.update(data).from(tableName).where({ id })

  const remove = id => knex.del().from(tableName).where({ id })

  return { create, find, update, remove, list }
}
