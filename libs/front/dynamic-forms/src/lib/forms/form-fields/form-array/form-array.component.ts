/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArrayData } from './form-array';
import {
  AbstractControlOptions,
  FormArray,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { takeWhile } from 'rxjs/operators';
import { BaseFieldComponent } from '../../core/directives/base-field.directive';
import { FieldEvent } from '../../core/interfaces/events';
import { DynamicFormControl } from '../../core/interfaces/field-config';
import { DynamicFormStepMode } from '../../core/interfaces/dynamic-stepped-form';

@Component({
  selector: 'fnx-nx-app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.scss'],
})
export class FormArrayComponent<T = any, K extends keyof T = keyof T>
  extends BaseFieldComponent<T, FormArrayData<T, K>, K, FormArray>
  implements OnInit
{
  public addingFormGroupCtrl: FormGroup;
  public addingFormArrayCtrl: FormArray;
  public addingFormCtrl: FormArray;
  log(...args: any[]) {
    console.log(args);
  }
  groupValidators = (): AbstractControlOptions => ({
    validators: this.config?.data?.groupValidations || [],
    asyncValidators: this.config?.data?.asyncGroupValidations || [],
  });

  public get mode() {
    return DynamicFormStepMode;
  }

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {
    super();
  }

  public get data(): FormArrayData<T, K> {
    return this?.config?.data;
  }

  ngOnInit(): void {
    switch (
      this.data?.formGroupConfig ||
      this.data?.formControlConfig ||
      this.data.formArrayConfig
    ) {
      case null:
      case undefined: {
        break;
      }
      case this.data?.formGroupConfig: {
        const config: DynamicFormControl[] = <DynamicFormControl[]>(
          this.data?.formGroupConfig
        );
        this.addingFormGroupCtrl = this.fb.group(
          config?.reduce(
            (p, c) => ({
              ...p,
              [c.field]: (() => {
                switch (c.type) {
                  case 'FormArray': {
                    return this.fb.array(
                      [], // this.config.createItem ? [this.config.createItem()] : [],
                      {
                        validators: c?.validation || [],
                        asyncValidators: c?.asyncValidation || [],
                        updateOn: 'change',
                      }
                    );
                    break;
                  }
                  // case 'Default': {
                  //   return this.fb.array(
                  //     [], // this.config.createItem ? [this.config.createItem()] : [],
                  //     c?.validation,
                  //     c?.asyncValidation
                  //   );
                  //   break;
                  // }
                  default:
                    return this.fb.control(
                      { value: c.value, disabled: c.disabled },
                      {
                        validators: c?.validation || [],
                        asyncValidators: c?.asyncValidation || [],
                        updateOn: 'change',
                      }
                    );
                    break;
                }
              })(),
            }),
            {}
          ),
          this.groupValidators()
        );
        break;
      }
      case this.data?.formArrayConfig: {
        const config: DynamicFormControl = <DynamicFormControl>(
          this.data?.formArrayConfig
        );
        this.addingFormArrayCtrl = this.fb.array(
          [], // this.config.createItem ? [this.config.createItem()] : [],
          {
            validators: config?.validation || [],
            asyncValidators: config?.asyncValidation || [],
            updateOn: 'change',
          }
        );
        break;
      }
      case this.data?.formControlConfig: {
        const config: DynamicFormControl = <DynamicFormControl>(
          this.data?.formControlConfig
        );
        this.addingFormCtrl = this.fb.array([], {
          validators: config?.validation || [],
          asyncValidators: config?.asyncValidation || [],
          updateOn: 'change',
        });
        break;
      }
    }

    if (!(this.control instanceof FormArray)) {
      this.group.removeControl(this.config.field);
      this.group.addControl(
        this.config.field,
        this.fb.array(
          [],
          this.config.validation || [],
          this.config.asyncValidation || []
        )
      );
    }

    if (this.config.setter) {
      this.config.setter
        ?.pipe(takeWhile(() => this.isActive))
        .subscribe((setter) => {
          switch (setter.type) {
            case 'onPatchValue': {
              const { value: values } = setter as FieldEvent<
                T,
                typeof setter.type
              >;
              if (values) {
                this.control.clear();
                for (const value of <any>values) {
                  const group = this.fb.group({}, this.groupValidators());
                  this.control.push(group);
                  setTimeout(() => {
                    group.patchValue(value);
                  });
                }
                this.cd.markForCheck();
              }
              break;
            }
            case 'setValue': {
              const { value: values } = setter as FieldEvent<
                T,
                typeof setter.type
              >;
              if (values) {
                for (const value of <any>values) {
                  const keys = Object.keys(value) as (keyof string)[];
                  const group = this.fb.group(
                    keys.reduce((acc, cur) => {
                      acc[cur] = value[cur];
                      return acc;
                    }, this.groupValidators())
                  );
                  this.control.push(group);
                  this.cd.markForCheck();
                  setTimeout(() => {
                    group.patchValue(value);
                  });
                }
              }
              break;
            }
            default: {
              break;
            }
          }
        });
    }
    // if (!!this.config?.data?.setter?.length) {
    //   this.config?.data?.setter?.forEach(
    //     s => s.pipe(
    //       takeWhile((x) => this.isActive)
    //     )
    //       .subscribe((setter: FormArraySetter) => {
    //         const {controlIndex, controlName, control} = setter
    //         const {value, type} = setter.setter
    //         const getParentControl = (): FormGroup => {
    //           if (!!control) {
    //             this.control?.controls?.find(i => control) || this.addingCtrl
    //           } else if (!!controlIndex) {
    //             return this.control?.controls?.[controlIndex] || this.addingCtrl
    //           } else {
    //             return this.addingCtrl
    //           }
    //         }
    //         const getControlToSet = (): AbstractControl => !!control ? control : getParentControl()?.controls?.[controlName]
    //         const getControlConfig = (controlName: string) =this.config.data.formConfig?.find(i => i.config.name === controlName)?.config
    //         const parentControl = getParentControl()
    //         const controlToSet = getControlToSet()
    //         switch (type) {
    //           case 'setVisibility': { //  not working good remove adding control work fine the dom don't render
    //             if (!!value) {
    //               !controlToSet && parentControl?.addControl(
    //                 controlName,
    //                 this.fb.control(controlName, getControlConfig(controlName)?.validation || [],
    //                   getControlConfig(controlName)?.asyncValidation || [])
    //               )
    //             } else if (!!controlToSet) {
    //               parentControl?.removeControl(controlName)
    //             }
    //             break;
    //           }
    //           default: {
    //             break
    //           }
    //         }
    //         this.cd.markForCheck()
    //       })
    //   )
    // }
  }

  public removeConfig(index: number) {
    this.config?.data?.onRemove!?.(this.control.value[index]);
    this.control.removeAt(index);
    this.config?.onChange!?.({
      currentValue: this.control.value,
      control: this.control,
    });
  }

  public addConfig() {
    this.control?.push(this.fb.group({}, this.groupValidators()));
  }
  saveToForm() {
    const buildForm = (state: any) =>
      (() => {
        switch (typeof state) {
          case 'object': {
            switch (Array.isArray(state)) {
              case true:
                return this.fb.array(
                  state?.reduce((pp, cc) => [...pp, buildForm(cc)], []) || []
                );
                break;
              default:
                return this.fb.group(
                  Object.keys(state || {}).reduce(
                    (p, c) => ({
                      ...p,
                      [c]: buildForm(state?.[c]),
                    }),
                    {}
                  )
                );
            }
            break;
          }
          default:
            return this.fb.control(state);
            break;
        }
      })();
    const state = this.addingFormGroupCtrl.getRawValue();
    // const buildFormValue = ;
    // debugger;
    const newControl = buildForm(state);
    this.control.push(newControl);
    // newControl?.valueChanges
    //   ?.pipe(
    //     takeWhile(() => this.isActive),
    //     // debounceTime(200),
    //     take(1)
    //   )
    //   .subscribe(() => {
    //     this;
    //     state;
    //     newControl?.patchValue(state);
    //   });
    const defaultVal = (<DynamicFormControl[]>(
      this.config.data.formGroupConfig
    ))?.reduce(
      (p, c) => ({
        ...p,
        [c.field]: {
          value: c.value,
          disabled: c.disabled,
        },
      }),
      {}
    );
    this.addingFormGroupCtrl.reset(defaultVal);
    this.config?.onChange!?.({
      currentValue: this.control.value,
      control: this.control,
    });
    this.cd.markForCheck();
  }
}
