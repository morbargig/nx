import { AsyncValidatorFn, FormArray, ValidatorFn } from '@angular/forms';
import {
  BaseFieldData,
  DynamicFormControl,
  DynamicFormControlArray,
  FieldConfigObj,
} from '../../core/interfaces/field-config';
import { JsonPrimitive } from '@angular/compiler-cli/ngcc/src/packages/entry_point';

// export type ArrayElement<ArrayType extends readonly unknown[]> =
//   ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

// type FixedSizeArray<N extends number, T> = N extends 0 ? never[] : {
//   0: T;
//   length: N;
// } & ReadonlyArray<T>;

// type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' | 'unshift' | number
// type ArrayItems<T extends Array<any>> = T extends Array<infer TItems> ? TItems : never
// type FixedLengthArray<T extends any[]> =
//   Pick<T, Exclude<keyof T, ArrayLengthMutationKeys>>
//   & { [Symbol.iterator]: () => IterableIterator<ArrayItems<T>> }

// const myFixedLengthArray: FixedSizeArray<3,string> = ['s', 's', '']

// export type FormArraySetter = { controlIndex?: number | 'add', controlName: string, setter: FieldEvent, control?: FormGroup }
export class FormArrayData<T = any, K extends keyof T = keyof T>
  implements BaseFieldData<T, K>
{
  public formGroupConfig?: K extends '_'
    ? never
    : T[K] extends (infer U)[]
    ? U extends object
      ? U extends any[]
        ? never
        : DynamicFormControlArray<U>
      : never
    : never;
  // public formControlConfig?: T[K] extends (infer U)[] ? (U extends JsonPrimitive ? DynamicFormControl<{ '_': U }> : never) : never;
  public formControlConfig?: T[K] extends (infer U)[]
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
    : // FieldComponentTypeObject<{ '_': U }, keyof { '_': U }, U, keyof Omit<typeof FormFieldType, 'FormArray'>>
      // DynamicFormControl<{ '_': U }, keyof { '_': U }, U, keyof Omit<typeof FormFieldType, 'FormArray'>>
      never;
  public formArrayConfig?: K extends '_'
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
  public groupValidations?: ValidatorFn[] = [];
  public asyncGroupValidations?: AsyncValidatorFn[] = [];

  constructor(obj?: FormArrayData<T, K>) {
    (Object.keys(obj || {}) as (keyof FormArrayData<T, K>)[])?.forEach(
      (key) => ((<any>this)[key] = obj[key])
    );
  }

  public onRemove?: (item: T) => void;
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
