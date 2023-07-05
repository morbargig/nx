import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  ChangeDetectionStrategy,
  HostBinding,
  Input,
  Output,
  TemplateRef,
  Type,
  OnDestroy,
} from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  Validators,
  FormArray,
} from '@angular/forms';
import { distinctUntilChanged, filter, takeWhile, take } from 'rxjs/operators';
import { DynamicFormStepMode } from '../../interfaces/dynamic-stepped-form';
import { FieldEvent } from '../../interfaces/events';
import { BaseFieldComponentDirective } from '../../directives/base-field.directive';
import { merge, tap, Observable, BehaviorSubject } from 'rxjs';
import { OnInit, AfterViewInit } from '@angular/core';
import {
  DynamicFormControl,
  FormFieldsDic,
  FormFieldType,
  lazyFieldLoadConfigure,
} from '../../interfaces/field-config';
@Component({
  selector: 'fnx-nx-dynamic-form-control',
  templateUrl: './dynamic-form-control.component.html',
  styleUrls: ['./dynamic-form-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormControlComponent<T = any>
  implements OnInit, AfterViewInit, OnDestroy
{
  @HostBinding('hidden') get isHiddenBind(): boolean {
    return this.config?.hidden || this.hide;
  }
  @HostBinding('class.invalid')
  get isInvalidClass(): boolean {
    const control = this.control;
    if (!control) return false;
    const isInvalid = control?.touched && !control?.valid && !control?.disabled;
    return isInvalid;
  }

  @HostBinding('class.dynamic-form-control') private componentClass = true;

  @HostBinding('class') private get dynamicFormControlComponentClass(): string {
    return (
      (this.config?.bodyStyle?.dynamicFormControlComponent?.styleClass ?? '') +
      ' ' +
      (Object.keys(
        this.config?.bodyStyle?.dynamicFormControlComponent?.styleClassObj || {}
      )
        ?.reduce(
          (p, c) => [
            ...p,
            ...(this.config?.bodyStyle?.dynamicFormControlComponent
              ?.styleClassObj?.[c]
              ? [c]
              : []),
          ],
          []
        )
        ?.join(' ') || '')
    );
  }

  public type: Type<BaseFieldComponentDirective<T, any, any, any>>;
  public typeChange: BehaviorSubject<this['type']> = new BehaviorSubject<
    this['type']
  >(null);
  public config: DynamicFormControl<T>;
  public id = `control-${(Math.random() + 1).toString(36).substring(4)}`;
  @Input() public control: AbstractControl;
  @Input() template: TemplateRef<any>;
  @Input() public mode: DynamicFormStepMode;
  @Input() public isRequired: boolean;
  @Input() public hideLabel: boolean;
  @Input() public parentForm: FormGroup | FormArray;
  @Output() public controlChange: EventEmitter<any> = new EventEmitter<any>();
  @HostBinding('class.d-none') hide: boolean;
  private isActive = true;

  constructor(private cd: ChangeDetectorRef) {}

  @Input() public set dynamicControl(dynamicControl: DynamicFormControl<T>) {
    this.cd.detach();
    const someStuff = () => {
      this.config = dynamicControl;
      if (this.isRequired !== undefined) {
        this.isRequired =
          dynamicControl.validation &&
          !!dynamicControl.validation.find((x) => x === Validators.required);
      }
    };
    if (dynamicControl?.loadCustomFieldComponent) {
      type loadCustomFieldComponentHelperType = ReturnType<
        typeof lazyFieldLoadConfigure
      >;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-extra-non-null-assertion
      (dynamicControl?.loadCustomFieldComponent as (
        ...args: any[]
      ) => Promise<loadCustomFieldComponentHelperType>)!?.({
        calBack: lazyFieldLoadConfigure,
      }).then((x) => {
        dynamicControl.data = x.data;
        this.type = x.component;
        this.cd.reattach();
        this.cd.detectChanges();
        this.typeChange.next(this.type);
      });
      someStuff();
    } else {
      this.type =
        FormFieldsDic?.[dynamicControl?.type] ||
        FormFieldsDic?.[FormFieldType.Default];
      someStuff();
      this.typeChange.next(this.type);
      this.cd.reattach();
      this.cd.detectChanges();
    }
  }

  ngAfterViewInit(): void {
    this.typeChange
      .pipe(
        takeWhile(() => this.isActive),
        filter((x) => !!x),
        take(1)
      )
      .subscribe(() => {
        const eventArr: Observable<any>[] = [];
        if (this.config.controlType !== 'none') {
          eventArr.push(
            this.control?.statusChanges.pipe(
              takeWhile(() => this.isActive),
              distinctUntilChanged()
            )
          );
        }
        if (!!this.config && !!this.control && !!this.controlChange) {
          eventArr.push(
            this.control.valueChanges.pipe(
              takeWhile(() => this.isActive),
              distinctUntilChanged(),
              tap((val) => this.controlChange.emit(val))
            )
          );
        }
        merge(...eventArr)
          .pipe(takeWhile(() => this.isActive))
          .subscribe(() => this.cd.detectChanges());
      });
  }

  ngOnInit(): void {
    this.typeChange
      .pipe(
        takeWhile(() => this.isActive),
        filter((x) => !!x),
        take(1)
      )
      .subscribe(() => {
        (this.config.setter as any)
          ?.pipe(
            filter((evt) => !!evt),
            takeWhile(() => this.isActive)
          )
          .subscribe((event) => {
            switch (event?.type) {
              case 'requiredSetter': {
                const { value } = event as FieldEvent<T, typeof event.type>;
                if (this.isRequired !== value && this.control) {
                  this.control?.clearValidators();
                  this.config.validation = [
                    ...(this.config?.validation?.filter(
                      (x) => x !== Validators.required
                    ) || []),
                    ...(value ? [Validators.required] : []),
                  ];
                  this.control?.setValidators(this.config?.validation);
                  this.control?.reset();
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
                    if (this.control) {
                      this.control.clearValidators();
                      this.control.setValidators(this.config?.validation);
                      this.control.updateValueAndValidity();
                    }
                    this.cd.detectChanges();
                    this.cd.markForCheck();
                  };
                  if (
                    !!active &&
                    !validationStringFunctions?.includes(strFunc)
                  ) {
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
      });
  }

  // @HostListener('click') private onClick() {
  //   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, @typescript-eslint/no-extra-non-null-assertion
  //   this.cd.detectChanges();
  // }
  ngOnDestroy(): void {
    this.isActive = false;
  }

  public setVisibility(isVisible: boolean) {
    this.hide = !isVisible;
    this.cd.markForCheck();
  }
}
