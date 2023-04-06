
import type { Knex } from "knex";
import { resolve } from 'path';

export const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      database: "verx_development",
      user: "postgres",
      password: "12345"
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

  test: {
    client: "postgresql",
    connection: {
      database: "verx_test",
      user: "postgres",
      password: "12345"
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
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};