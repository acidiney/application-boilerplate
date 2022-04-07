import type { Knex } from 'knex'
import { config } from 'dotenv'

import { join } from 'path'

config()

export const knexConfig: Knex.Config = {
  client: process.env.DATABASE_CLIENT,
  connection: {
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT || 3306),
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD
  },
  migrations: {
    tableName: 'blockchain_migrations',
    directory: join(__dirname, '/src/infra/db/mysql/migrations')
  }
}
