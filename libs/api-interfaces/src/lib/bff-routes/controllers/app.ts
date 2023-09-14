import { DynamicFormControl } from '@fnx-nx/front/dynamic-forms';
import { User } from '../../api-interfaces';
import { controlType } from './controllers';

export const BFF_APP_CONTROL_ROUTES = {
  hatcheck: {
    method: 'get',
    response: null as boolean,
  },
  helloForm: {
    method: 'get',
    response: null as DynamicFormControl<User>[],
  },
} as const satisfies controlType;
