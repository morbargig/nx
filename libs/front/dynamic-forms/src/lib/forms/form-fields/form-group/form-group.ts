import {
  BaseFieldData,
  DynamicFormControlArray,
} from '../../core/interfaces/field-config';

export interface FormGroupData<T = any, K extends keyof T = keyof T>
  extends BaseFieldData<T, K> {
  formConfig: T extends { [key in K]: infer V }
    ? V extends object
      ? DynamicFormControlArray<V>
      : never
    : never;
}
