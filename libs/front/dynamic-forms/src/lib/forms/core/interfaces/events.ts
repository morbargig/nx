/* eslint-disable  @typescript-eslint/no-explicit-any */
import { ValidatorFn } from '@angular/forms';

export type SetterActionTypeObj<
  T = any,
  K extends keyof T = keyof T
  // DModel = any
> = {
  setDisabled: boolean;
  setVisibility: boolean;
  requiredSetter: boolean;
  setValue: T;
  onPatchValue: T;
  // setData: DModel;
  // markForCheck: K;
  // customEvent: T;
  setValidation: { active: boolean; validation: ValidatorFn };
};
export type SetterActionType = keyof SetterActionTypeObj;

export type FieldEvent<
  T = any,
  A extends SetterActionType = SetterActionType,
  K extends keyof T = keyof T
  // DModel = any
> = {
  [KK in A]-?: {
    type: A;
    value: SetterActionTypeObj<
      T,
      K
      // DModel
    >[KK];
  };
}[A];
