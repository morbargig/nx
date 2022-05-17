import { User } from '@fnx-nx/api-interfaces';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DynamicFormControl } from '@fnx-nx/front/dynamic-forms';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('helloForm')
  getData(): DynamicFormControl<User>[] {
    return JSON.parse(JSON.stringify(this.appService.getHelloFormConf()));
  }
}
