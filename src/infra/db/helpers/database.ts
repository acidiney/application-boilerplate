import knex, { Knex } from 'knex'
import { knexConfig } from '../../../../knexfile'
export default {
  client: null as Knex,
  async setup () {
    this.client = knex(knexConfig)
  }
}
