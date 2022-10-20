require('./dotenv')

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PWD,
      database: process.env.DB_NAME
    },
    migrations: {
      directory: '../data/migrations',
      tableName: 'knex_migrations'
    }
  }
}
