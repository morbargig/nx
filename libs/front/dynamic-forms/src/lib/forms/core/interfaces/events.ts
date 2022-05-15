/* eslint-disable  @typescript-eslint/no-explicit-any */
import {ValidatorFn} from '@angular/forms';

export type setterActionTypeObj<T = any> = {
  setDisabled: boolean;
  setVisibility: boolean;
  requiredSetter: boolean;
  setValue: T;
  onPatchValue: T;
  // customEvent: T;
  setValidation: { active: boolean; validation: ValidatorFn };
};
export type setterActionType = keyof setterActionTypeObj;

export type FieldEvent<T = any,
  A extends setterActionType = setterActionType> = {
  [K in A]-?: {
    type: A;
    value: setterActionTypeObj<T>[A];
  };
}[A];
