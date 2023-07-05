import {
  FormGroup,
  AbstractControlOptions,
  ValidatorFn,
  AsyncValidatorFn,
} from '@angular/forms';
import { NewFormArray, NewFormGroup } from './field-config';
import { Observable } from 'rxjs';
import { DynamicSteppedForm } from './dynamic-stepped-form';
import { CustomSubscribable } from './base';

export type ObjWithObjectKeys<O = any, T = any> = {
  [P in keyof O]?: T;
};
export interface WizardPageConfig<T = any> {
  arrayConfig?: WizardArrayConfig<T>;
  arrayConfig$?: CustomSubscribable<WizardArrayConfig<T>>;
  wizardBody?: WizardPageBody;
  wizardBody$?: CustomSubscribable<WizardPageBody>;
  // breadcrumbs?: BreadcrumType[];
  // formChanged$?: CustomSubscribable<StepFormGroup>;
  submit: (values: T) => Observable<any>;
  // getEntityById?: (id: number) => Observable<T>;
  // toForm?: (entity: T) => { [name: string]: FormGroup };
  // fromForm?: (value: { [name: string]: FormGroup }) => FormGroup[];
  // modifyOnEdit?: (config:  WizardArrayConfig, form: FormGroup, data: T) => void;
}

export interface WizardPageBody {
  title?: string;
  subTitle?: string;
  useStepperService?: boolean;
  closeUrl?: string[];
}

export interface WizardArrayConfig<T> extends AbstractControlOptions {
  controls: DynamicSteppedForm<T>[];
  /**
   * @description
   * The list of validators applied to a control.
   */
  validators?: ValidatorFn[];
  /**
   * @description
   * The list of async validators applied to control.
   */
  asyncValidators?: AsyncValidatorFn[];
  errorMessages?: { [error: string]: string };
}

export type StepFormGroup<T = any> = NewFormGroup<
  { forms: any },
  NewFormArray<
    NewFormGroup<
      T,
      NewFormGroup<
        T[keyof T],
        NewFormGroup<T[keyof T][keyof T[keyof T]], FormGroup>
      >
    > &
      NewFormGroup<
        any,
        NewFormGroup<
          T,
          NewFormGroup<
            T[keyof T],
            NewFormGroup<T[keyof T][keyof T[keyof T]], FormGroup>
          >
        >
      >
  >
>;

export type StepFormGroupGetRawValue<T = Record<string, unknown>> = {
  forms: (T & ObjWithObjectKeys<any, T>)[];
};
