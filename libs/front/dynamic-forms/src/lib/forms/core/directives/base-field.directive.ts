import { Directive, Input, OnDestroy } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import {
  BaseFieldData,
  Field,
  FieldConfigObj,
  FiledParentControl,
} from '../interfaces/field-config';

@Directive()
export abstract class BaseFieldComponent<
  T = any,
  D extends BaseFieldData<T, K> = BaseFieldData<T>,
  K extends keyof { [key in keyof T]: any } = keyof { [key in keyof T]: any },
  A extends AbstractControl = AbstractControl,
  P extends FormGroup | FormArray = FormGroup | FormArray,
  G extends FiledParentControl<T, P, A> = FiledParentControl<T, P, A>
> implements Field<T, D, K, A, P, G>, OnDestroy
{
  @Input() public config: FieldConfigObj<T, D, K>;
  @Input() public parentForm: G;
  @Input() public id: string;
  protected isActive = true;

  protected _control: A;
  public get control(): A {
    return this._control;
  }
  @Input() public set control(v: A) {
    this._control = v;
  }

  public get data(): D {
    return this.config.data;
  }

  public ngOnDestroy() {
    this.isActive = false;
  }
}
