import { AbstractControl } from '@angular/forms';
import { BaseFieldData } from '../../core/interfaces/field-config';

export interface FormTextData<T = any, K extends keyof T = keyof T>
  extends BaseFieldData<T, K> {
  hint?: (ctr: AbstractControl) => string;
  rows?: number;
  cols?: number;
  step?: number;
  enterClicked?: (val: any, ctrl: AbstractControl) => void;
  inputType?: ValidInputType;

  // public keyFilter: DefaultMasks;
}

type ValidInputType =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';
