import { Module } from '@nestjs/common'
import { IndexRoute } from './index.route'

@Module({
  controllers: [
    IndexRoute
  ]
})
export class IndexModule {}
