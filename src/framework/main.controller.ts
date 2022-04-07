import { Controller, Get } from '@nestjs/common'

@Controller()
export class MainController {
  @Get()
  index (): string {
    return 'ok'
  }
}
