import {AbstractControl} from '@angular/forms';
import {BaseFieldData, FieldConfigObj} from '../../core/interfaces/field-config';
import {BaseFieldComponent} from '../../core/directives/base-field.directive';

type AutoGeneratorAction<T = any, K extends keyof T = keyof T> = (config: FieldConfigObj<T, FormTextData<T, K>, K>, form: BaseFieldComponent['group']) => string | void;

export class FormTextData<T = any, K extends keyof T = keyof T> implements BaseFieldData<T, K> {
  public autoGenerator?: boolean;
  public autoGeneratorLabel?: string;
  public autoGeneratorAction?: AutoGeneratorAction<T, K>;
  public rows?: number;
  public cols? = 4;
  public step?: number;
  public enterClicked?: (val: any, ctrl: AbstractControl) => void;
  public inputType?:
    'hidden'
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
    | 'separator' = 'text';

  constructor(obj?: FormTextData) {
    (Object.keys(obj || {}) as (keyof FormTextData<T, K>)[])?.forEach((key) => ((<any>this)[key] = obj[key]));
  }
  // public keyFilter: DefaultMasks;
}
