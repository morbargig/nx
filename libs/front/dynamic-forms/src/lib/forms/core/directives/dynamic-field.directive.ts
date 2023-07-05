/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
import { AbstractControl, FormGroup, FormArray } from '@angular/forms';
import { filter, takeWhile } from 'rxjs/operators';
import { BaseFieldComponentDirective } from './base-field.directive';
import { FieldEvent } from '../interfaces/events';
import { ChangeDetectorRef } from '@angular/core';
import { DynamicFormBuilderService } from '../services/dynamic-form-builder.service';
import { firstValueFrom, timer } from 'rxjs';

@Directive({
  selector: '[fnxNxDynamicField]',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['id', 'parentForm', 'config: fnxNxDynamicField'],
})
export class DynamicFieldDirective<
    T = any,
    D extends object = object,
    K extends keyof T = keyof T,
    A extends AbstractControl = AbstractControl,
    P extends FormGroup | FormArray = FormGroup | FormArray
  >
  extends BaseFieldComponentDirective<T, D, K, A, P>
  implements OnInit, OnChanges, OnDestroy
{
  public component: ComponentRef<BaseFieldComponentDirective<T, D, K, A, P>>;
  @Input() public type: Type<BaseFieldComponentDirective<T, D, K, A, P>>;
  @Output() public setVisibility: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  @Output() public controlChange: EventEmitter<AbstractControl> =
    new EventEmitter<AbstractControl>();
  private isHidden?: boolean;

  constructor(
    private container: ViewContainerRef,
    private cd: ChangeDetectorRef,
    private dfb: DynamicFormBuilderService
  ) {
    super();
  }

  @Input() public override set control(ctrl) {
    this._control = ctrl;
    this.controlChange.emit(this._control);
  }
  public override get control() {
    return this._control;
  }

  public override ngOnDestroy() {
    this?.component?.instance?.ngOnDestroy!?.();
    super.ngOnDestroy!?.();
  }

  ngOnChanges() {
    if (this.component) {
      this.component.instance.control = this.control;
      this.component.instance.id = this.id;
      this.component.instance.config = this.config;
      this.component.instance.parentForm = this.parentForm;
      this.cd.markForCheck();
    }
  }

  override ngOnInit(): void {
    this.createComponent();
    this.config.setter
      ?.pipe(
        filter((x) => !!x),
        takeWhile(() => this.isActive)
      )
      .subscribe((evt) => {
        switch (evt.type) {
          case 'setValue':
            this.control.setValue(evt.value);
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
    switch (this.parentForm.constructor) {
      case FormArray: {
        break;
      }
      case FormGroup: {
        const buildCtrl = this.dfb.buildChild(this.config as any) as A;
        if (
          !this.control ||
          !this.control.value ||
          this.control?.constructor !== buildCtrl?.constructor
        ) {
          this.control = buildCtrl;
          (this.parentForm as FormGroup).setControl(
            this.config.field,
            this.control
          );
        }
        break;
      }
      default: {
        break;
      }
    }
    this.config?.registerControl!?.({
      control: this.control,
      field: this.config?.field,
    });
  }

  private createComponent() {
    this.component = this.container.createComponent<
      BaseFieldComponentDirective<T, D, K, A, P>
    >(this.type);
    if (this.config.controlType !== 'none') {
      this.createAbstractControl();
    }
    this.component.instance.control = this.control;
    this.component.instance.id = this.id;
    this.component.instance.config = this.config;
    this.component.instance.parentForm = this.parentForm;
  }

  private setFieldVisibility(visibility: boolean) {
    if (visibility !== !this.isHidden) {
      firstValueFrom(timer(0)).then(() => {
        this.isHidden = !visibility;
        this.setVisibility.emit(!this.isHidden);
      });
    }
  }

  private setDisabled(enabled: boolean) {
    if (!enabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }
}
