import { BaseFieldData } from '../../core/interfaces/field-config';
import { Type } from '@angular/core';
export interface FormCheckboxData<T = any, K extends keyof T = keyof T>
  extends BaseFieldData<T, K> {
  classTemplate?: Type<any>;
  label?:string
}