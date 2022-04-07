import {Controller, Get} from "@nestjs/common";

@Controller()
export class MainController {
  @Get()
  index () {
    return 'ok'
  }
}
