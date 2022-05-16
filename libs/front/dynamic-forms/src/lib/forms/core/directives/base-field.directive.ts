import {Directive, OnDestroy} from '@angular/core';
import {AbstractControl, FormArray, FormGroup} from '@angular/forms';
import {BaseFieldData, Field, FieldConfigObj, FiledParentControl} from '../interfaces/field-config';

@Directive()
export abstract class BaseFieldComponent<T = any,
  D extends BaseFieldData<T, K> = BaseFieldData<T>,
  K extends keyof { [key in keyof T]: any } = keyof { [key in keyof T]: any },
  A extends AbstractControl = AbstractControl,
  P extends FormGroup | FormArray = FormGroup,
  G extends FiledParentControl<T, P, A> = FiledParentControl<T, P, A>,
  > implements Field<T, D, K, A, P, G>,
  OnDestroy {
  public config: FieldConfigObj<T, D, K>;
  public group: G;
  public id: string;
  protected isActive = true;

  public get control()
    : P extends FormArray ? A[] : A {
    if (this.group instanceof FormArray) {
      return this.group.controls as any
    } else {
      return (this.group.controls as any)?.[this.config.field];
    }
  }

  public ngOnDestroy() {
    this.isActive = false;
  }
}
