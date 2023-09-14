import { DynamicFormControl } from '@fnx-nx/front/dynamic-forms';
import { User } from '../../api-interfaces';

export type controlType = {
  readonly [k: string]: {
    // path: Path;
    readonly method: 'get' | 'post' | 'put' | 'delete';
    readonly response: unknown;
    // body, response, query, params, headers etc
  };
};
