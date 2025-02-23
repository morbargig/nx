import { Injectable } from '@nestjs/common';
// import { User } from '@softbar/api-interfaces';
// import { DynamicFormControl } from '@softbar/front/dynamic-forms';

@Injectable()
export class AppService {
  healthCheck = true;
  // getHelloFormConf(): DynamicFormControl<User>[] {
  //   return formConfig;
  // }
}
