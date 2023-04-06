
const { resolve } = require('path');

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: "postgresql",
    connection: {
      database: "verx_development",
      user: "postgres",
      password: "12345",
      host: process.env.DB_HOST
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: resolve('src/infra/db/knex/migrations')
    },
    seeds: {
      directory: resolve('src/infra/db/knex/seeds')
    }
  },

  test: {
    client: 'sqlite3',
      connection: {
      filename: "./mydb-test.sqlite",
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: resolve('src/infra/db/knex/migrations'),
      extension: 'ts'
    },
    seeds: {
      directory: resolve('src/infra/db/knex/seeds'),
      extension: 'ts'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
