import { User } from '@softbar/api-interfaces';
import { AppService } from './app.service';
import { DynamicFormControl } from '@softbar/front/dynamic-forms';
import { ApiCustomResponse } from '../shared/decorators/api-paginated-response.decorator';
import { ApiResponse } from '@nestjs/swagger';
import { ResponseDto } from '../shared/dto/response.dto';
import { CustomControllerRouteDecorators } from '../shared/decorators/custom-route.decorator';

const { Get, Controller, ControllerApiType } =
  CustomControllerRouteDecorators();
type ControllerApiType = typeof ControllerApiType;
@Controller('')
export class AppController implements ControllerApiType {
  constructor(private readonly appService: AppService) {}
  // duplicate for reason
  @ApiResponse({
    type: ResponseDto,
  })
  @ApiResponse({
    type: 'boolean',
  })
  @Get('hatcheck')
  hatcheck(): boolean {
    return true;
  }

  @ApiCustomResponse({})
  @Get('hello-form')
  helloForm(): DynamicFormControl<User>[] {
    return JSON.parse(JSON.stringify(this.appService.getHelloFormConf()));
  }
}
