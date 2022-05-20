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

  recursionBuildForm = <T = any>(state: DynamicFormControl<T>) => {
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
          // case state.data?.formGroupConfig: {
          //   const config: DynamicFormControl[] = <DynamicFormControl[]>(
          //     state.data?.formGroupConfig
          //   );
          //   config[0].field;
          //   return this.fb.array(
          //     config?.reduce(
          //       (pp, cc) => ({
          //         ...pp,
          //         [cc.field]: this.recursionBuildForm(cc),
          //       }),
          //       {}
          //     ) || []
          //     // TODO add
          //   );
          //   break;
          // }
          // TODO add matrix support
          // case state.data?.formArrayConfig: {
          //   const config: DynamicFormControl = <DynamicFormControl>(
          //     state.data?.formArrayConfig
          //   );
          //   return this.fb.array(
          //     // config?.reduce(
          //     //   (pp, cc) => [...pp, this.recursionBuildForm(cc)],
          //     //   []
          //     // ) || []
          //   );
          //   break;
          // }
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
      default:
        return this.fb.control(state);
        break;
    }
  };
}
