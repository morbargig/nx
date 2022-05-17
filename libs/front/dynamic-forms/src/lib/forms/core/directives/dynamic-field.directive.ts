import {
  ComponentRef,
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { filter, takeWhile } from 'rxjs/operators';
import { DynamicFormControl, Field } from '../interfaces/field-config';
import { BaseFieldComponent } from './base-field.directive';
import { FieldEvent } from '../interfaces/events';

@Directive({
  selector: '[fnxNxDynamicField]',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['id', 'group'],
})
export class DynamicFieldDirective<T = any>
  extends BaseFieldComponent
  implements OnInit, OnChanges, OnDestroy
{
  public component: ComponentRef<Field<T>>;
  @Input('fnxNxDynamicField') public override config: DynamicFormControl<T>;
  @Input() public type: Type<Field<T>>;
  @Output() public setVisibility: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() public controlChange: EventEmitter<AbstractControl> =
    new EventEmitter<AbstractControl>();
  private isHidden?: boolean;

  constructor(
    private container: ViewContainerRef,
    private fb: FormBuilder
  ) // private cd: ChangeDetectorRef
  {
    super();
  }

  private _control: AbstractControl;

  public override get control(): AbstractControl {
    return this._control;
  }

  @Input()
  public override set control(ctrl: AbstractControl) {
    this._control = ctrl;
    this.controlChange.emit(this._control);
  }

  public override ngOnDestroy() {
    this?.component?.instance?.ngOnDestroy?.();
    super.ngOnDestroy();
  }

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
      this.component.instance.id = this.id;
    }
  }

  ngOnInit(): void {
    this.createComponent();
    this.config.setter
      ?.pipe(
        filter((x) => !!x),
        takeWhile(() => this.isActive)
      )
      .subscribe((evt) => {
        switch (evt.type) {
          case 'setValue':
            this.group.controls[this.config.field].setValue(evt.value);
            break;
          case 'setDisabled': {
            const { value } = evt as FieldEvent<T, typeof evt.type>;
            this.setDisabled(value);
            break;
          }
          case 'setVisibility': {
            const { value } = evt as FieldEvent<T, typeof evt.type>;
            this.setFieldVisibility(value);
            break;
          }
          default:
            break;
        }
      });
  }

  public createAbstractControl() {
    switch (this.config.controlType) {
      case 'array':
        this.group.addControl(
          this.config.field,
          this.fb.array(
            [], // this.config.createItem ? [this.config.createItem()] : [],
            this.config.validation,
            this.config.asyncValidation ? this.config.asyncValidation : null
          )
        );
        break;
      case 'group':
        this.group.addControl(
          this.config.field,
          this.fb.group(
            {},
            {
              validators: this.config.validation,
              asyncValidators: this.config.asyncValidation
                ? this.config.asyncValidation
                : null,
            }
          )
        );
        break;
      case 'control':
      default:
        if (this.group.get(this.config.field)) {
          const ctrl = this.group.get(this.config.field);
          if (this.config.validation?.length) {
            ctrl.setValidators(this.config.validation);
          }
          if (this.config?.asyncValidation?.length) {
            ctrl.setAsyncValidators(this.config.asyncValidation);
          }
        } else {
          this.group.addControl(
            this.config.field,
            this.fb.control(
              { value: this.config.value, disabled: this.config.disabled },
              this.config.validation,
              this.config.asyncValidation ? this.config.asyncValidation : null
            )
          );
        }
        break;
    }
    this.control = this.group.controls[this.config.field];
    if (this.config.registerControl) {
      this.config.registerControl(this.control);
    }
    // this.control.valueChanges
    //   .pipe(
    //     takeWhile(() => this.isActive),
    //     debounceTime(200),
    //     take(1)
    //   )
    //   .subscribe(() => {
    //     this.cd.detectChanges();
    //     this.cd.markForCheck();
    //   });
  }

  private createComponent() {
    this.component = this.container.createComponent<Field<T>>(this.type);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
    this.component.instance.id = this.id;
    if (this.config.controlType !== 'none') {
      this.createAbstractControl();
    }
  }

  private setFieldVisibility(visibility: boolean) {
    if (visibility !== !this.isHidden) {
      setTimeout(() => {
        this.isHidden = !visibility;
        this.setVisibility.emit(!this.isHidden);
      });
    }
  }

  private setDisabled(enabled: boolean) {
    if (!enabled && !!this.group.controls[this.config.field]) {
      this.group.controls[this.config.field].disable();
    } else {
      this.group.controls[this.config.field].enable();
    }
  }

  // @HostListener('blur') onBlur() {
  //   const value = this.ngControl.value || '';
  //   !!value && this.setValue(CurrencyFormatterDirective.formatPrice(value));
  // }
}
