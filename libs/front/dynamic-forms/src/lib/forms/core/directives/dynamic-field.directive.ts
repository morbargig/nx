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
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormArray,
} from '@angular/forms';
import { filter, takeWhile } from 'rxjs/operators';
import { BaseFieldComponent } from './base-field.directive';
import { FieldEvent } from '../interfaces/events';
import { ChangeDetectorRef } from '@angular/core';

@Directive({
  selector: '[fnxNxDynamicField]',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['id', 'group', 'config: fnxNxDynamicField'],
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
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    super();
  }

  @Input()
  public override set control(ctrl) {
    this._control = ctrl;
    this.controlChange.emit(this._control);
    this.cd;
  }

  public override ngOnDestroy() {
    this?.component?.instance?.ngOnDestroy?.();
    super.ngOnDestroy();
  }

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
      this.component.instance.control = this.control;
      this.component.instance.id = this.id;
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

  public async createAbstractControl() {
    {
      let control: AbstractControl;
      switch (this.config.controlType) {
        case 'array': {
          switch (this.group instanceof FormArray) {
            case true: {
              const c = this.config;
              control = this.fb.array([], {
                validators: c?.validation || [],
                asyncValidators: c?.asyncValidation || [],
                updateOn: 'change',
              });
              (this.group as FormArray).push(control);
              break;
            }
            default: {
              const c = this.config;
              control = this.fb.array(
                [], // this.config.createItem ? [this.config.createItem()] : [],
                {
                  validators: c?.validation || [],
                  asyncValidators: c?.asyncValidation || [],
                  updateOn: 'change',
                }
              );
              (this.group as FormGroup).addControl(this.config.field, control);
              break;
            }
          }

          break;
        }
        case 'group': {
          switch (this.group instanceof FormArray) {
            case true: {
              const c = this.config;
              control = this.fb.group(
                {},
                {
                  validators: c?.validation || [],
                  asyncValidators: c?.asyncValidation || [],
                  updateOn: 'change',
                }
              );
              (this.group as FormArray).push(control);
              break;
            }
            default: {
              const c = this.config;
              control = this.fb.group(
                {},
                {
                  validators: c?.validation || [],
                  asyncValidators: c?.asyncValidation || [],
                  updateOn: 'change',
                }
              );
              (this.group as FormGroup).addControl(c.field, control);
              break;
            }
          }

          break;
        }
        case 'control':
        default: {
          switch (this.group instanceof FormArray) {
            case true: {
              const c = this.config;
              control = this.fb.control(null, {
                validators: c?.validation || [],
                asyncValidators: c?.asyncValidation || [],
                updateOn: 'change',
              });
              (this.group as FormArray).push(control);
              break;
            }
            default: {
              const c = this.config;
              const ctrl = this.group.get(c.field);
              if (ctrl) {
                if (c.validation?.length) {
                  ctrl.setValidators(c.validation);
                }
                if (c?.asyncValidation?.length) {
                  ctrl.setAsyncValidators(c.asyncValidation);
                }
              } else {
                const c = this.config;
                control = this.fb.control(
                  { value: c.value, disabled: c.disabled },
                  {
                    validators: c?.validation || [],
                    asyncValidators: c?.asyncValidation || [],
                    updateOn: 'change',
                  }
                );
                (this.group as FormGroup).addControl(
                  this.config.field,
                  control
                );
              }
              break;
            }
          }

          break;
        }
      }
      this.control = control;
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
    switch (this.group instanceof FormArray) {
      case true: {
        this.control;
        break;
      }

      default:
        break;
    }
    if (!enabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }
}
