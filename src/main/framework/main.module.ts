import { EventEmitterModule } from '@nestjs/event-emitter'
import { Module } from '@nestjs/common'

import { RoutesModule } from './routes/routes.module'

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    RoutesModule
  ]
})
export class MainModule {
}
