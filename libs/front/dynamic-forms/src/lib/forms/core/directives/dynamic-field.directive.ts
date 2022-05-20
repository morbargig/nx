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
import { BaseFieldComponent } from './base-field.directive';
import { FieldEvent } from '../interfaces/events';
import { ChangeDetectorRef } from '@angular/core';
import { DynamicFormBuilderService } from '../services/dynamic-form-builder.service';

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
  extends BaseFieldComponent<T, D, K, A, P>
  implements OnInit, OnChanges, OnDestroy
{
  public component: ComponentRef<BaseFieldComponent<T, D, K, A, P>>;
  @Input() public type: Type<BaseFieldComponent<T, D, K, A, P>>;
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

  @Input()
  public override set control(ctrl) {
    this._control = ctrl;
    this.controlChange.emit(this._control);
  }
  public override get control() {
    return this._control;
  }

  public override ngOnDestroy() {
    // switch (this.parentForm.constructor) {
    //   // case FormArray: {
    //   //   this.control.setParent(null);
    //   //   break;
    //   // }
    //   // case FormGroup: {
    //   //   (this.parentForm as FormGroup).removeControl(this.config.field);
    //   //   break;
    //   // }
    //   default: {
    //     break;
    //   }
    // }
    this?.component?.instance?.ngOnDestroy?.();
    super.ngOnDestroy();
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
    // switch (this.parentForm instanceof FormArray) {
    //   case true: {
    //     const c = this.config;
    //     control = this.fb.control(null, {
    //       validators: c?.validation || [],
    //       asyncValidators: c?.asyncValidation || [],
    //       updateOn: 'change',
    //     });
    //     (this.parentForm as FormArray).push(control);
    //     break;
    //   }
    //   default: {
    //     const c = this.config;
    //     const ctrl = this.parentForm?.get(c.field);
    //     if (ctrl) {
    //       if (c.validation?.length) {
    //         ctrl.setValidators(c.validation);
    //       }
    //       if (c?.asyncValidation?.length) {
    //         ctrl.setAsyncValidators(c.asyncValidation);
    //       }
    //       control = ctrl;
    //     } else {
    //       const c = this.config;
    //       control = this.fb.control(
    //         { value: c.value, disabled: c.disabled },
    //         {
    //           validators: c?.validation || [],
    //           asyncValidators: c?.asyncValidation || [],
    //           updateOn: 'change',
    //         }
    //       );
    //       (this.parentForm as FormGroup).addControl(
    //         this.config.field,
    //         control
    //       );
    //     }
    //     break;
    //   }
    // }
    // if (this.parentForm instanceof FormArray) {
    //   this.parentForm.push(this.control);
    // } else
    // switch (this.parentForm.constructor) {
    //   case FormArray: {
    //     break
    //   }
    switch (this.parentForm.constructor) {
      case FormArray: {
        // this.control = this.dfb.buildChild(this.config as any) as A;
        // (this.parentForm as FormArray).push(this.control);
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

    this.config?.registerControl!?.(this.control);
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
    this.component = this.container.createComponent<
      BaseFieldComponent<T, D, K, A, P>
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
      setTimeout(() => {
        this.isHidden = !visibility;
        this.setVisibility.emit(!this.isHidden);
      });
    }
  }

  private setDisabled(enabled: boolean) {
    // switch (this.parentForm instanceof FormArray) {
    //   case true: {
    //     this.control;
    //     break;
    //   }

    //   default:
    //     break;
    // }
    if (!enabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }
}
