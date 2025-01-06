/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArrayData } from './form-array';
import { AbstractControlOptions, FormArray, FormGroup } from '@angular/forms';
import { BaseFieldComponentDirective } from '../../core/directives/base-field.directive';
import { DynamicFormControl } from '../../core/interfaces/field-config';
import { DynamicFormStepMode } from '../../core/interfaces/dynamic-stepped-form';
import { DynamicFormBuilderService } from '../../core/services/dynamic-form-builder.service';
import { FormControl } from '@angular/forms';
import { timer, firstValueFrom } from 'rxjs';

@Component({
  selector: 'softbar-app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.scss'],
})
export class FormArrayComponent<T = any, K extends keyof T = keyof T>
  extends BaseFieldComponentDirective<T, FormArrayData<T, K>, K, FormArray>
  implements OnInit
{
  // array of array
  public get addingFormArrayCtrl(): FormControl {
    return this.addingFormArrayCtrlGroupWarper.get(
      (<any>this.data?.formArrayConfig)?.field
    ) as FormControl;
  }
  public addingFormArrayCtrlGroupWarper: FormGroup;
  // array of groups
  public addingFormGroupCtrl: FormGroup;
  // array of primitive (not object or arrays)
  public get addingFormCtrl(): FormControl {
    return this.addingFormCtrlGroupWarper.get(
      (<any>this.data?.formControlConfig)?.field
    ) as FormControl;
  }
  public addingFormCtrlGroupWarper: FormGroup;

  groupValidators = (): AbstractControlOptions => ({
    validators: this.config?.data?.groupValidations || [],
    asyncValidators: this.config?.data?.asyncGroupValidations || [],
  });

  public get mode(): typeof DynamicFormStepMode {
    return DynamicFormStepMode;
  }

  constructor(
    private cd: ChangeDetectorRef,
    private dfb: DynamicFormBuilderService
  ) {
    super();
  }

  override ngOnInit(): void {
    switch (
      this.data?.formGroupConfig ||
      this.data?.formControlConfig ||
      this.data.formArrayConfig
    ) {
      case null:
      case undefined: {
        break;
      }
      case this.data?.formControlConfig: {
        this.addingFormCtrlGroupWarper = this.dfb.buildGroup([]);
        break;
      }
      case this.data?.formGroupConfig: {
        const config: DynamicFormControl[] = <DynamicFormControl[]>(
          this.data?.formGroupConfig
        );
        this.addingFormGroupCtrl = this.dfb.buildGroup(
          config,
          this.groupValidators()
        );
        break;
      }
      case this.data?.formArrayConfig: {
        const config: DynamicFormControl = this.data?.formArrayConfig;
        this.addingFormArrayCtrlGroupWarper = this.dfb.buildGroup([config]);
        break;
      }
    }

    // if (!(this.control instanceof FormArray)) {
    //   this.parentForm.removeControl(this.config.field);
    //   this.parentForm.addControl(
    //     this.config.field,
    //     this.fb.array(
    //       [],
    //       this.config.validation || [],
    //       this.config.asyncValidation || []
    //     )
    //   );
    // }

    // if (this.config.setter) {
    //   this.config.setter
    //     ?.pipe(takeWhile(() => this.isActive))
    //     .subscribe((setter) => {
    //       switch (setter.type) {
    //         case 'onPatchValue': {
    //           const { value: values } = setter as FieldEvent<
    //             T,
    //             typeof setter.type
    //           >;
    //           if (values) {
    //             this.control.clear();
    //             for (const value of <any>values) {
    //               const group = this.fb.group({}, this.groupValidators());
    //               this.control.push(group);
    //               setTimeout(() => {
    //                 group.patchValue(value);
    //               });
    //             }
    //             this.cd.markForCheck();
    //           }
    //           break;
    //         }
    //         case 'setValue': {
    //           const { value: values } = setter as FieldEvent<
    //             T,
    //             typeof setter.type
    //           >;
    //           if (values) {
    //             for (const value of <any>values) {
    //               const keys = Object.keys(value) as (keyof string)[];
    //               const group = this.fb.group(
    //                 keys.reduce((acc, cur) => {
    //                   acc[cur] = value[cur];
    //                   return acc;
    //                 }, this.groupValidators())
    //               );
    //               this.control.push(group);
    //               this.cd.markForCheck();
    //               setTimeout(() => {
    //                 group.patchValue(value);
    //               });
    //             }
    //           }
    //           break;
    //         }
    //         default: {
    //           break;
    //         }
    //       }
    //     });
    // }
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
    const ctrl = this.control?.at(index);
    this.config?.data?.onRemove!?.({ val: ctrl.value, ctrl });
    this.control.removeAt(index);
    this.config?.onChange!?.({
      currentValue: this.control.value,
      control: this.control,
    });
  }

  saveToForm() {
    switch (
      this.data?.formGroupConfig ||
      this.data?.formControlConfig ||
      this.data.formArrayConfig
    ) {
      case null:
      case undefined: {
        break;
      }
      case this.data?.formControlConfig: {
        const config: DynamicFormControl = <DynamicFormControl>(
          this.data?.formControlConfig
        );
        const newFormCtrl = this.dfb.buildChild(config);
        newFormCtrl.patchValue(this.addingFormCtrl.value);
        newFormCtrl.setParent(this.control);
        this.control.push(newFormCtrl);
        this.addingFormCtrlGroupWarper.reset();
        break;
      }
      case this.data?.formGroupConfig: {
        const config: DynamicFormControl[] = <DynamicFormControl[]>(
          this.data?.formGroupConfig
        );
        this.control.push(this.addingFormGroupCtrl);
        this.addingFormGroupCtrl = null;
        this.cd.markForCheck();
        firstValueFrom(timer(0)).then(() => {
          this.addingFormGroupCtrl = this.dfb.recursionBuildGroup(
            config,
            this.groupValidators()
          );
          this.cd.markForCheck();
          this.addingFormGroupCtrl.reset();
        });
        break;
      }
      case this.data?.formArrayConfig: {
        const config: DynamicFormControl = this.data?.formArrayConfig;
        this.control.push(this.addingFormArrayCtrl);
        this.addingFormArrayCtrlGroupWarper?.removeControl(config.field);
        this.addingFormArrayCtrlGroupWarper = null;
        this.cd.markForCheck();
        firstValueFrom(timer(0)).then(() => {
          this.addingFormArrayCtrlGroupWarper = this.dfb.buildGroup([config]);
          this.cd.markForCheck();
          this.addingFormArrayCtrlGroupWarper.reset();
        });
        break;
      }
    }
    // const buildForm = (state: any) =>
    //   (() => {
    //     switch (typeof state) {
    //       case 'object': {
    //         switch (Array.isArray(state)) {
    //           case true:
    //             return this.fb.array(
    //               state?.reduce((pp, cc) => [...pp, buildForm(cc)], []) || []
    //             );
    //             break;
    //           default:
    //             return this.fb.group(
    //               Object.keys(state || {}).reduce(
    //                 (p, c) => ({
    //                   ...p,
    //                   [c]: buildForm(state?.[c]),
    //                 }),
    //                 {}
    //               )
    //             );
    //         }
    //         break;
    //       }
    //       default:
    //         return this.fb.control(state);
    //         break;
    //     }
    //   })();

    // addingFormCtrl?.valueChanges
    //   ?.pipe(
    //     takeWhile(() => this.isActive),
    //     // debounceTime(200),
    //     take(1)
    //   )
    //   .subscribe(() => {
    //     newControl?.patchValue(state);
    //   });
    this.config?.onChange!?.({
      currentValue: this.control.value,
      control: this.control,
    });
    this.cd.markForCheck();
  }

  addConfig() {
    switch (
      this.data?.formGroupConfig ||
      this.data?.formControlConfig ||
      this.data.formArrayConfig
    ) {
      case null:
      case undefined: {
        break;
      }
      case this.data?.formControlConfig: {
        const config: DynamicFormControl = <DynamicFormControl>(
          this.data?.formControlConfig
        );
        const newCtrl = this.dfb.buildChild(config);
        this.control.push(newCtrl);
        break;
      }
      case this.data?.formGroupConfig: {
        const config: DynamicFormControl[] = <DynamicFormControl[]>(
          this.data?.formGroupConfig
        );
        const newFormGroup = this.dfb.buildGroup(
          config,
          this.groupValidators()
        );
        newFormGroup.setParent(this.control);
        this.control.push(newFormGroup);
        break;
      }
      case this.data?.formArrayConfig: {
        const config: DynamicFormControl = this.data?.formArrayConfig;
        const newCtrl = this.dfb.buildChild(config);
        this.control.push(newCtrl);
        break;
      }
    }
  }
}
