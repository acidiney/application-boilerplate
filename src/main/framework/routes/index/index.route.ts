import { Controller, Get } from '@nestjs/common'
import { ApiExcludeController } from '@nestjs/swagger'
import { Env } from '@infra/config/env'

class APIOptions {
  version: string
  appName: string
  appDescription: string
  documentationLink?: string
}

@ApiExcludeController()
@Controller()
export class IndexRoute {
  @Get()
  async index (): Promise<APIOptions> {
    return {
      appName: Env.appName,
      appDescription: Env.appDescription,
      version: Env.appVersion,
      documentationLink: `${Env.httpProtocol}://${Env.host}:${Env.port}/docs`
    }
  }
}
