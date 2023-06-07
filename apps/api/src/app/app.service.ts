import { Injectable } from '@nestjs/common';
import { User, formConfig } from '@fnx-nx/api-interfaces';
import { DynamicFormControl } from '@fnx-nx/front/dynamic-forms';

@Injectable()
export class AppService {
  getHelloFormConf(): DynamicFormControl<User>[] {
    return formConfig;
  }
}
