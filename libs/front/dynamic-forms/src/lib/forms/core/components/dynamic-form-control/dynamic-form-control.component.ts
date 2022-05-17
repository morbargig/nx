import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
  HostBinding,
  Input,
  OnInit,
  Output,
  TemplateRef,
  Type,
} from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged, filter, takeWhile } from 'rxjs/operators';
import { FormTextComponent } from '../../../form-fields/form-text/form-text.component';
import { DynamicFormStepMode } from '../../interfaces/dynamic-stepped-form';
import { FieldEvent } from '../../interfaces/events';
import {
  DynamicFormControl,
  Field,
  FormFieldsDic,
} from '../../interfaces/field-config';

@Component({
  selector: 'fnx-nx-dynamic-form-control',
  templateUrl: './dynamic-form-control.component.html',
  styleUrls: ['./dynamic-form-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormControlComponent<T = any>
  implements OnInit, AfterViewInit
{
  public type: Type<Field<T, any, any, any>>;
  public config: DynamicFormControl<T>;
  public id = `control-${(Math.random() + 1).toString(36).substring(4)}`;
  public control: AbstractControl;
  public visible = true;
  @Input() template: TemplateRef<any>;
  @Input() public mode: DynamicFormStepMode;
  @Input() public isRequired: boolean;
  @Input() public hideLabel: boolean;
  @Input() public group: FormGroup;
  @Input() public wrapStyleClass: string;
  @Output() public controlOnChange: EventEmitter<any> = new EventEmitter<any>();
  @HostBinding('class.d-none') hide  :boolean;
  private isActive = true;

  constructor(private cd: ChangeDetectorRef) {}

  @Input()
  public set dynamicControl(dynamicControl: DynamicFormControl<T>) {
    if (!dynamicControl?.type) {
      return;
    }
    this.type =
      FormFieldsDic?.[dynamicControl?.type] ||
      dynamicControl?.customFieldComponent ||
      FormTextComponent;
    this.config = dynamicControl;
    this.isRequired =
      dynamicControl.validation &&
      !!dynamicControl.validation.find((x) => x === Validators.required);
    this.cd.detectChanges();
  }

  ngAfterViewInit(): void {
    if (!!this.config && !!this.control && !!this.controlOnChange) {
      this.control.valueChanges
        .pipe(
          takeWhile(() => this.isActive),
          distinctUntilChanged()
        )
        .subscribe((val) => this.controlOnChange.emit(val));
    }
  }

  ngOnInit(): void {
    if (this.config?.setter) {
      this.config.setter
        .pipe(
          filter((evt) => !!evt),
          takeWhile(() => this.isActive)
        )
        .subscribe((event) => {
          switch (event?.type) {
            case 'requiredSetter': {
              const { value } = event as FieldEvent<T, typeof event.type>;
              if (this.isRequired !== value) {
                this.control.clearValidators();
                this.config.validation = [
                  ...(this.config?.validation?.filter(
                    (x) => x !== Validators.required
                  ) || []),
                  ...(value ? [Validators.required] : []),
                ];
                this.control.setValidators(this.config?.validation);
                this.control.reset();
              }
              this.isRequired = value;
              this.cd.detectChanges();
              this.cd.markForCheck();
              break;
            }
            case 'setValidation': {
              const {
                value: { active, validation },
              } = event as FieldEvent<T, typeof event.type>;
              if ((!!active || active === false) && validation) {
                const strFunc = validation?.toString();
                const validationStringFunctions: string[] =
                  this.config?.validation?.map((i) => i?.toString()) || [];
                const resetControl = () => {
                  this.control.clearValidators();
                  this.control.setValidators(this.config?.validation);
                  this.control.updateValueAndValidity();
                  this.cd.detectChanges();
                  this.cd.markForCheck();
                };
                if (!!active && !validationStringFunctions?.includes(strFunc)) {
                  this.config.validation = [
                    ...(this.config?.validation || []),
                    validation,
                  ];
                  resetControl();
                } else if (
                  !active &&
                  !!validationStringFunctions?.includes(strFunc)
                ) {
                  this.config.validation = [
                    ...(this.config?.validation?.filter(
                      (i) => i?.toString() !== strFunc
                    ) || []),
                  ];
                  resetControl();
                }
              }
              break;
            }
            case 'setVisibility': {
              const { value } = event as FieldEvent<T, typeof event.type>;
              this.setVisibility(value);
              break;
            }
            default:
              break;
          }
        });
    }
  }

  public setVisibility(isVisible: boolean) {
    this.visible = isVisible;
    this.hide = !this.visible;
    this.cd.markForCheck();
  }
}
