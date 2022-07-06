import { User } from '@fnx-nx/api-interfaces';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DynamicFormControl } from '@fnx-nx/front/dynamic-forms';
import { ApiCustomResponse } from '../shared/decorators/api-paginated-response.decorator';
import { ApiResponse } from '@nestjs/swagger';
import { ResponseDto } from '../shared/dto/response.dto';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // duplicate for reason
  @ApiResponse({
    type: ResponseDto,
  })
  @ApiResponse({
    type: 'boolean',
  })
  @Get('hatcheck')
  getCheck(): boolean {
    return true;
  }

  @ApiCustomResponse({})
  @Get('helloForm')
  getData(): DynamicFormControl<User>[] {
    return JSON.parse(JSON.stringify(this.appService.getHelloFormConf()));
  }
}
