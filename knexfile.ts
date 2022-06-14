import 'module-alias/register'
import { join } from 'path'
import { config } from 'dotenv'

config()

const extension = String(process.env.NODE_ENV).toLowerCase() === 'production'
  ? 'js'
  : 'ts'

const knexConfig = {
  client: process.env.DATABASE_CLIENT,
  connection: {
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT || 3306),
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
  },
  migrations: {
    tableName: 'migrations',
    directory: join(__dirname, '/src/infra/db/mysql/migrations'),
    extension: extension,
    loadExtensions: [`.${extension}`]
  },
  seeders: {

  }
}

export default knexConfig
