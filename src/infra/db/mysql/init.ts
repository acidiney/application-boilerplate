import knex, { Knex } from 'knex'
import { attachPaginate } from 'knex-paginate'
import knexConfig from '../../../../knexfile'

import { Env } from '../../config/env'

export const MysqlHelper = {
  knex: null as Knex,
  async setup (logger: {info: any}) {
    const conn = knexConfig
    this.knex = knex({
      ...conn,
      connection: {
        ...conn.connection as any,
        database: null
      }
    })

    await this.knex
      .raw(`CREATE DATABASE IF NOT EXISTS ${Env.database.name} character set utf8 collate utf8_general_ci`)
      .then(async () => {
        logger.info('[Application] -> Database created!')
        await this.knex.destroy()

        this.knex = knex(conn)
        attachPaginate()

        await this.knex.migrate.latest()
          .then(() => {
            logger.info('[Application] -> Schema updated!')
          })
      })
  }
}
