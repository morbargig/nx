import { Injectable } from '@nestjs/common';
import { User, formConfig } from '@softbar/api-interfaces';
import { DynamicFormControl } from '@softbar/front/dynamic-forms';

@Injectable()
export class AppService {
  getHelloFormConf(): DynamicFormControl<User>[] {
    return formConfig;
  }
}
