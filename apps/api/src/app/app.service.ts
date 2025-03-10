import { Injectable } from '@nestjs/common';
import type {  User } from '@softbar/api-interfaces';
import { formConfig } from '@softbar/api-interfaces';
import type { DynamicFormControl } from '@softbar/front/dynamic-forms';

@Injectable()
export class AppService {
  healthCheck = true;
  getHelloFormConf(): DynamicFormControl<User>[] {
    return formConfig;
  }
}
