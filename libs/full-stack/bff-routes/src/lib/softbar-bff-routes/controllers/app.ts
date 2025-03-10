import { DynamicFormControl } from '@softbar/front/dynamic-forms';
import { controlType } from './controllers';
import { User } from '@softbar/api-interfaces';

export const BFF_APP_CONTROL_ROUTES = {
  'health-check': {
    method: 'get',
    response: null as boolean,
  },
  'hello-form': {
    method: 'get',
    response: null as DynamicFormControl<User>[],
  },
} as const satisfies controlType;
