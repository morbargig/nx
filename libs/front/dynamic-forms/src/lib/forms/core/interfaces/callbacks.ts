import { AbstractControl, FormGroup } from '@angular/forms';

export type CallbackFunction<T = any> = (item?: T) => FormGroup;
export type ChangedCallBack<
  C extends AbstractControl = AbstractControl,
  T = any
> = ({ currentValue, control }: { currentValue: T; control: C }) => void;
export type RegisterControlCallBack<
  C extends AbstractControl = AbstractControl,
  K extends string = string
> = ({ control, field }: { control: C; field: K }) => void;
