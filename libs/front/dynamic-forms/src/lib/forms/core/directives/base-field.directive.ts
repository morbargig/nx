import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import type { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { debounceTime, takeWhile } from 'rxjs/operators';
import type {
  BaseFieldData,
  Field,
  FieldConfigObj,
  FiledParentControl,
} from '../interfaces/field-config';

@Directive({
  standalone:true
})
export abstract class BaseFieldComponentDirective<
  T = any,
  D extends BaseFieldData<T, K> = BaseFieldData<T>,
  K extends keyof { [key in keyof T]: any } = keyof { [key in keyof T]: any },
  A extends AbstractControl = AbstractControl,
  P extends FormGroup | FormArray = FormGroup | FormArray,
  G extends FiledParentControl<T, P, A> = FiledParentControl<T, P, A>
> implements Field<T, D, K, A, P, G>, OnDestroy, OnInit
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
    return this.config?.data;
  }

  @HostListener('click') private onClick() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-extra-non-null-assertion
    this?.config?.onClick!?.(this.control);
  }

  @HostListener('input') private onInput() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-extra-non-null-assertion
    this?.config?.onInput!?.(this.control);
  }
  @HostListener('focusout') private onBlur() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-extra-non-null-assertion
    this?.config?.onBlur!?.(this.control);
  }

  @HostBinding('class') private get baseCellClasses(): string {
    return (
      (this.config?.bodyStyle?.field?.styleClass ?? '') +
      ' ' +
      (Object.keys(this.config?.bodyStyle?.field?.styleClassObj || {})
        ?.reduce(
          (p, c) => [
            ...p,
            ...(this.config?.bodyStyle?.field?.styleClassObj?.[c] ? [c] : []),
          ],
          []
        )
        ?.join(' ') || '')
    );
  }

  public ngOnInit(): void {
    if (this.config?.onChange) {
      this.control?.valueChanges
        ?.pipe(
          takeWhile(() => this.isActive),
          debounceTime(100)
        )
        .subscribe((x) => {
          this.config?.onChange?.({
            currentValue: x,
            control: this.control,
          });
        });
    }
  }

  public ngOnDestroy() {
    this.isActive = false;
  }
}
