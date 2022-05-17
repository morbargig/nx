import { Directive, OnDestroy } from '@angular/core';
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
  P extends FormGroup | FormArray = FormGroup,
  G extends FiledParentControl<T, P, A> = FiledParentControl<T, P, A>
> implements Field<T, D, K, A, P, G>, OnDestroy
{
  public config: FieldConfigObj<T, D, K>;
  public group: G;
  public id: string;
  protected isActive = true;

  protected _control: A;
  public get control(): A {
    if (!(this.group instanceof FormArray)) {
      return this.group.controls?.[this.config.field as string];
    }
    return this._control;
  }
  public set control(v: A) {
    this._control = v;
  }

  public ngOnDestroy() {
    this.isActive = false;
  }
}
