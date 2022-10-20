const currentEnv = process.env.NODE_ENV || 'development'
const knexConfig = require('../config/knexfile')
const knex = require('knex')(knexConfig[currentEnv])

module.exports = knex
