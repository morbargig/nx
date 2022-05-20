import { Injectable } from '@angular/core';
import {
  FormBuilder,
  AbstractControl,
  FormGroup,
  AbstractControlOptions,
} from '@angular/forms';
import { DynamicFormControl } from '../interfaces/field-config';
import { FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormBuilderService {
  constructor(private fb: FormBuilder) {}
  buildChild<T = any>(c: DynamicFormControl<T>): AbstractControl {
    switch (c.type) {
      case 'FormArray': {
        return this.fb.array(
          [], // this.config.createItem ? [this.config.createItem()] : [],
          {
            validators: c?.validation || [],
            asyncValidators: c?.asyncValidation || [],
            // updateOn: 'change',
          }
        );
        break;
      }
      case 'FormGroup': {
        return this.fb.group(
          {},
          {
            validators: c?.validation || [],
            asyncValidators: c?.asyncValidation || [],
            // updateOn: 'change',
          }
        );
      }
      default: {
        return this.fb.control(
          { value: c.value, disabled: c.disabled },
          {
            validators: c?.validation || [],
            asyncValidators: c?.asyncValidation || [],
            // updateOn: 'change',
          }
        );
        break;
      }
    }
  }
  buildGroup<T = any>(
    configs: DynamicFormControl<T>[],
    abstractControlOptions: AbstractControlOptions = {}
  ): FormGroup {
    return this.fb.group(
      configs?.reduce(
        (p, c) => ({
          ...p,
          [c.field]: this.fb.control(null),
        }),
        {} as FormGroup['controls']
      ),
      abstractControlOptions
    );
  }
  buildArray(abstractControlOptions: AbstractControlOptions = {}): FormArray {
    return this.fb.array([], abstractControlOptions);
  }

  recursionBuildGroup = <T = any>(
    configs: DynamicFormControl<T>[],
    abstractControlOptions: AbstractControlOptions = {}
  ): FormGroup => {
    return this.fb.group(
      configs?.reduce(
        (p, c) => ({
          ...p,
          [c.field]: this.recursionBuildChild(c),
        }),
        {} as FormGroup['controls']
      ),
      abstractControlOptions
    );
  };

  recursionBuildChild = <T = any>(
    state: DynamicFormControl<T>
  ): AbstractControl => {
    switch (state.type) {
      case 'FormArray': {
        switch (
          state.data?.formGroupConfig ||
          state.data?.formControlConfig ||
          state.data.formArrayConfig
        ) {
          case null:
          case undefined: {
            break;
          }
          case state.data?.formGroupConfig: {
            const configs: DynamicFormControl[] = <DynamicFormControl[]>(
              state.data?.formGroupConfig
            );
            return this.fb.array(
              [
                this.recursionBuildGroup(configs, {
                  validators: state?.data?.groupValidations || [],
                  asyncValidators: state?.data?.asyncGroupValidations || [],
                }),
              ]
            );
            break;
          }

          case state.data?.formControlConfig: {
            const config: DynamicFormControl = <DynamicFormControl>(
              state.data?.formControlConfig
            );
            return this.buildChild(config);
            break;
          }
        }
        break;
      }
      case 'FormGroup': {
        const config: DynamicFormControl[] = <DynamicFormControl[]>(
          state.data?.formConfig
        );
        return this.recursionBuildGroup(config);
        break;
      }
      default:
        return this.fb.control(state);
        break;
    }
  };
}
