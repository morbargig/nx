import {FormGroup} from '@angular/forms';
import {NewFormArray, NewFormGroup} from './field-config';

export type ObjWithObjectKeys<O = any, T = any> = {
  [P in keyof O]?: T;
};

export type StepFormGroup<T = any> = NewFormGroup<{ forms: any }, NewFormArray<NewFormGroup<T,
  NewFormGroup<T[keyof T],
    NewFormGroup<T[keyof T][keyof T[keyof T]], FormGroup>>> &
  NewFormGroup<any,
    NewFormGroup<T,
      NewFormGroup<T[keyof T],
        NewFormGroup<T[keyof T][keyof T[keyof T]], FormGroup>>>>>>;

export type StepFormGroupGetRawValue<T = Record<string, unknown>> = {
  forms: (T & ObjWithObjectKeys<any, T>)[];
};
