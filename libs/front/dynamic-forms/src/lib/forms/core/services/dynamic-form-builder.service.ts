import { Injectable } from '@angular/core';
import {
  FormBuilder,
  AbstractControl,
  FormGroup,
  AbstractControlOptions,
} from '@angular/forms';
import { DynamicFormControl } from '../interfaces/field-config';
import { FormArray } from '@angular/forms';
import { JsonObject, JsonValue } from '@softbar/api-interfaces';
import { FormArrayData } from '../../form-fields/form-array/form-array';
import { FormGroupData } from '../../form-fields/form-group/form-group';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormBuilderService {
  constructor(private fb: FormBuilder) {}
  private splitAndCapitalize(str: string): string {
    const words = str.match(/^[a-z]+|[A-Z][a-z]*/g) || [];
    // Capitalize first word
    if (words.length > 0) {
      words[0] =
        words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
    }
    return words.join(' ');
  }

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
      configs
        .filter((i) => !!i)
        ?.reduce(
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
            return this.fb.array([
              this.recursionBuildGroup(configs, {
                validators: state?.data?.groupValidations || [],
                asyncValidators: state?.data?.asyncGroupValidations || [],
              }),
            ]);
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
        const configs: DynamicFormControl[] = <DynamicFormControl[]>(
          state.data?.formConfig
        );
        const bodyStyle: DynamicFormControl['bodyStyle'] = {
          label: {
            styleClass: 'hidden',
          },
        };
        return this.recursionBuildGroup(
          configs.map((i) => ({ ...i, bodyStyle }))
        );
        break;
      }
      default: {
        const { disabled, value } = state;
        return this.fb.nonNullable.control({
          value,
          disabled,
        });
        break;
      }
    }
  };

  fromJsonArrayToConfigRecursion(json: JsonValue[], label?: string) {
    const returnDefault = (
      json: any[],
      v?: string | number | bigint | boolean
    ) =>
      ({
        field: l ? l : '_',
        ...(l ? { label: this.splitAndCapitalize(l) } : {}),
        type: 'FormArray',
        data: {
          formControlConfig: {
            field: '_',
            type: 'Default',
            value: v,
            data: {
              inputType: {
                string: 'text',
                number: 'number',
                bigint: 'number',
                boolean: 'checkbox',
                undefined: 'hidden',
              }?.[typeof json?.[0]],
            },
          },
        } as FormArrayData<{ _: string }>,
      } as DynamicFormControl);
    const l = label;
    switch (typeof json?.[0]) {
      case 'string':
      case 'number':
      case 'bigint':
      case 'boolean': {
        return returnDefault(json, json?.[0]);
        break;
      }
      case 'object': {
        if (Array.isArray(json?.[0])) {
          return {
            field: l ? l : '_',
            ...(l
              ? {
                  label: this.splitAndCapitalize(l),
                }
              : {}),
            type: 'FormArray',
            data: {
              formArrayConfig: this.fromJsonArrayToConfigRecursion(json?.[0]),
            } as FormArrayData<{ _: string[] }>,
          } as DynamicFormControl;
        } else if (json?.[0] !== null) {
          const bodyStyle: DynamicFormControl['bodyStyle'] = {
            label: {
              styleClass: 'hidden',
            },
          };
          return {
            field: l ? l : '_',
            ...(l
              ? {
                  label: this.splitAndCapitalize(l),
                }
              : {}),
            type: 'FormArray',
            data: {
              formGroupConfig: this.fromJsonToConfigRecursion(json?.[0]).map(
                (i) => ({ ...i, bodyStyle })
              ),
            } as FormArrayData<{ _: object }>,
          } as DynamicFormControl;
        } else {
          return returnDefault(json);
        }
        break;
      }
      default:
        break;
    }
  }

  fromJsonToConfigRecursion(json: JsonObject) {
    const returnDefault = (json: any, i: any) =>
      ({
        field: i,
        type: 'Default',
        value: json?.[i],
        label: this.splitAndCapitalize(i),
        data: {
          inputType: {
            string: 'text',
            number: 'number',
            bigint: 'number',
            boolean: 'checkbox',
            undefined: 'hidden',
          }?.[typeof json?.[i]],
        },
      } as DynamicFormControl);
    return Object.keys(json || {})?.map((i) => {
      switch (typeof json?.[i]) {
        case 'string':
        case 'number':
        case 'bigint':
        case 'boolean': {
          return returnDefault(json, i);
          break;
        }
        case 'object': {
          if (Array.isArray(json?.[i])) {
            return this.fromJsonArrayToConfigRecursion(json?.[i] as any, i);
          } else if (json?.[i] !== null) {
            return {
              field: i,
              label: this.splitAndCapitalize(i),
              type: 'FormGroup',
              data: {
                formConfig: this.fromJsonToConfigRecursion(json?.[i] as any),
              } as FormGroupData<{ _: object }>,
            } as DynamicFormControl;
          } else {
            return returnDefault(json, i);
          }
          break;
        }
        default:
          break;
      }
    });
  }
}
