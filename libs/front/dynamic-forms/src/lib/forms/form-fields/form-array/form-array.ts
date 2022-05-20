import {
  AsyncValidatorFn,
  FormArray,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { JsonPrimitive } from '@fnx-nx/api-interfaces';
import {
  BaseFieldData,
  DynamicFormControl,
  DynamicFormControlArray,
  FieldConfigObj,
} from '../../core/interfaces/field-config';

export interface FormArrayData<T = any, K extends keyof T = keyof T>
  extends BaseFieldData<T, K> {
  formGroupConfig?: K extends '_'
    ? never
    : T[K] extends (infer U)[]
    ? U extends object
      ? U extends any[]
        ? never
        : DynamicFormControlArray<U>
      : never
    : never;
  formControlConfig?: T[K] extends (infer U)[]
    ? U extends object
      ? never
      : U extends JsonPrimitive
      ? // FixedLengthArray<[
        DynamicFormControl<
          { _: U },
          keyof { _: U }
          // , U, keyof Omit<typeof FormFieldType, 'FormArray'>
        >
      : // ]>
        // FixedSizeArray<1,
        //   (DynamicFormControl<{ '_': U }, keyof { '_': U }, U, keyof Omit<typeof FormFieldType, 'FormArray'>>)>
        // FieldConfigObj<{ '_': U }>
        never
    : never;
  // FieldComponentTypeObject<{ '_': U }, keyof { '_': U }, U, keyof Omit<typeof FormFieldType, 'FormArray'>>
  // DynamicFormControl<{ '_': U }, keyof { '_': U }, U, keyof Omit<typeof FormFieldType, 'FormArray'>>
  formArrayConfig?: K extends '_'
    ? never
    : T[K] extends (infer U)[]
    ? U extends any[]
      ? FieldConfigObj<
          { _: U },
          FormArrayData<{ _: U }>,
          keyof { _: U },
          'FormArray',
          FormArray
        >
      : never
    : never;
  groupValidations?: ValidatorFn[];
  asyncGroupValidations?: AsyncValidatorFn[];

  onRemove?: ({ ctrl, val }: { ctrl: AbstractControl; val: T }) => void;
  // public setter?: (Observable<FormArraySetter> | Subject<FormArraySetter>)[];
  // public dynamicConfig?: (index: number, item: any) => FieldConfigObj[];
  // public formConfig: any;
  // public nestedConfig?: FieldConfigObj[];
  // public title?: string;
  // public addLabel?: string;
  // public isRoot?: boolean;
  // public showSeparator?: boolean = true;
  // public showAddingMode?: boolean = false;
  // public disableAddAndRemoveMode?: boolean = false;
  // public hideShowAndHideListButton?: boolean
  // public disabled?: boolean;
  // public data?: any[] = null;
  // public disabled$?: Observable<boolean>;
  // public errorMessages?: { [error: string]: string };
  // public hideTableHead?: boolean = false;
  // public tableStyleClass?: string;
  // public inputsMode?: DynamicFormStepMode = DynamicFormStepMode.Default;
  // // public filters?: DynamicFormControl[]
  // // public applyFilters?: (control: FormArray, formConfig: DynamicFormControl[], filters: any) => void
  // public useGlobalFilter?: boolean
}
