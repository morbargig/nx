import { AbstractControl } from '@angular/forms';
import { BaseFieldData } from '../../core/interfaces/field-config';

export interface FormTextData<T = any, K extends keyof T = keyof T>
  extends BaseFieldData<T, K> {
  rows?: number;
  cols?: number;
  step?: number;
  enterClicked?: (val: any, ctrl: AbstractControl) => void;
  inputType?:
    | 'hidden'
    | 'text'
    | 'password'
    | 'number'
    | 'datetime-local'
    | 'date'
    | 'month'
    | 'week'
    | 'time'
    | 'tel'
    | 'color'
    | 'label'
    | 'separator';

  // public keyFilter: DefaultMasks;
}
