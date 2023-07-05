import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { OnDestroy, Type } from '@angular/core';
import type { ChangedCallBack, RegisterControlCallBack } from './callbacks';
import { FormTextComponent } from '../../form-fields/form-text/form-text.component';
import { FieldEvent, SetterActionType } from './events';
import { FormArrayComponent } from '../../form-fields/form-array/form-array.component';
import { FormGroupComponent } from '../../form-fields/form-group/form-group.component';
import { CustomSubscribable } from './base';
import { FormRadioComponent } from '../../form-fields/form-radio/form-radio.component';
import { FormAutocompleteComponent } from '../../form-fields/form-autocomplete/form-autocomplete.component';
import { FormCheckboxComponent } from '../../form-fields/form-checkbox/form-checkbox.component';
import { BaseFieldComponentDirective } from '../directives/base-field.directive';
import { FormSelectComponent } from '../../form-fields/form-select/form-select.component';

type componentWithData<
  T = any,
  K extends keyof T = keyof T,
  C extends Type<any> = Type<any>,
  D extends BaseFieldData<T, K> = InstanceType<C>['data']
> = {
  component?: C;
  data?: D;
};

export function lazyFieldLoadConfigure<
  T = any,
  K extends keyof T = keyof T,
  C extends Type<any> = Type<any>
  // C extends Type<BaseCellComponent<any, any, any>> = Type<any>
>(data: componentWithData<T, K, C>): componentWithData<T, K, C> {
  return data;
}

export type elStyleObj = {
  styleClass?: string;
  style?: { [k: string]: string };
  styleClassObj?: { [k: string]: boolean };
};

export enum FormFieldType {
  /** basic component made to answer primitive values and input known type attribute types types */
  Default,
  /** this component made to answer arrays types */
  FormArray,
  /** this component made to answer object types */
  FormGroup,
  FormRadio,
  FormAutocomplete,
  FormCheckbox,
  FormSelect,
  DynamicLazy,
}

class FormsFieldClassType<T = any, K extends keyof T = keyof T> {
  FieldDicType = {
    Default: FormTextComponent as Type<FormTextComponent<T, K>>,
    FormArray: FormArrayComponent as Type<FormArrayComponent<T, K>>,
    FormGroup: FormGroupComponent as Type<FormGroupComponent<T, K>>,
    FormRadio: FormRadioComponent as Type<FormRadioComponent<T, K>>,
    FormAutocomplete: FormAutocompleteComponent as Type<
      FormAutocompleteComponent<T, K>
    >,
    FormCheckbox: FormCheckboxComponent as Type<FormCheckboxComponent<T, K>>,
    FormSelect: FormSelectComponent as Type<FormSelectComponent<T, K>>,
    DynamicLazy: null as any,
  } as const satisfies {
    [key in keyof typeof FormFieldType]-?: Type<
      BaseFieldComponentDirective<any, any, any>
    >;
  };
}

type FieldComponentType<
  T = any,
  K extends keyof T = keyof T
> = FormsFieldClassType<T, K>['FieldDicType'];

export const FormFieldsDic = {
  Default: FormTextComponent,
  FormArray: FormArrayComponent,
  FormGroup: FormGroupComponent,
  FormRadio: FormRadioComponent,
  FormAutocomplete: FormAutocompleteComponent,
  FormCheckbox: FormCheckboxComponent,
  FormSelect: FormSelectComponent,
  DynamicLazy: undefined as any,
} as const satisfies FieldComponentType;

// tslint:disable-next-line:no-empty-interface
export type BaseFieldData<
  T = any,
  K extends keyof T = keyof T /** will have used on extends components */
  // C extends AbstractControl = AbstractControl
> = object;

export type Field<
  T = any,
  DModel extends BaseFieldData<T, K> = BaseFieldData<T>,
  K extends keyof { [key in keyof T]: any } = keyof { [key in keyof T]: any },
  A extends AbstractControl = AbstractControl,
  P extends FormArray | FormGroup = FormGroup,
  G extends FiledParentControl<T, P, A> = FiledParentControl<T, P, A>
  // V extends T[keyof T] = T[keyof T]
> = {
  config: FieldConfigObj<T, DModel, K>;
  parentForm: G;
  id: string;
} & Partial<OnDestroy>;

export type GetFieldCComponentData<
  T = any,
  K extends keyof T = keyof T,
  CT extends keyof FieldComponentType = keyof FieldComponentType
> = {
  [E in CT]?: FieldComponentType<T, K>[E] extends Type<infer C> // when you chose type this will be the data type of this component
    ? C extends BaseFieldComponentDirective<any, infer D, any, any, any, any>
      ? // ? C extends BaseFieldComponent<[T,infer D,K,...(any)]>
        C extends BaseFieldComponentDirective<T, infer D, K, any, any, any>
        ? D
        : D
      : any
    : any;
}[CT];

export type FieldComponentTypeObject<
  T = any,
  K extends keyof T = keyof T,
  V extends T[K] = T[K],
  CT extends keyof FieldComponentType = keyof FieldComponentType
> = {
  [E in CT]?: FieldConfigObj<
    T,
    FieldComponentType<T, K>[E] extends Type<infer C> // when you chose type this will be the data type of this component
      ? C extends BaseFieldComponentDirective<any, infer D, any, any, any, any>
        ? // ? C extends BaseFieldComponent<[T,infer D,K,...(any)]>
          C extends BaseFieldComponentDirective<T, infer D, K, any, any, any>
          ? D
          : D
        : any
      : any,
    K,
    E
  >;
}[CT];
// | FieldConfigObj<T, any, K, never, AbstractControl>;

type MyErrorType<
  T extends keyof Pick<FieldConfigObj, 'loadCustomFieldComponent'>,
  E extends string | number | never
> = `${T} can't be set where the type has a specific component type. To use it, remove "type: ${E}"`;
export class FieldConfigObj<
  T = any,
  DModel extends BaseFieldData<T, K> = BaseFieldData<T>,
  K extends keyof { [key in keyof T]: any } = keyof { [key in keyof T]: any },
  E extends keyof typeof FormFieldType = keyof typeof FormFieldType,
  C extends AbstractControl = AbstractControl
> {
  /** if the form represents data like a user so 'birthday' is one of the user filed that can display on the form */
  field?: K & string;
  label?: string;
  labelHtml?: (ctrl: C) => string;
  /** if the form represents data like a user so for 'birthday' which is user filed can be a filed with type date */
  type: E;
  data?: E extends 'DynamicLazy' ? null : DModel;
  loadCustomFieldComponent?: E extends 'DynamicLazy'
    ? (data: {
        /** it just for type proposes */
        t?: T;
        /** it just for type proposes */
        k?: K;
        calBack: typeof lazyFieldLoadConfigure;
      }) => Promise<
        ReturnType<
          typeof lazyFieldLoadConfigure<
            T,
            K,
            Type<BaseFieldComponentDirective<T, any, K>>
          >
        >
      >
    : MyErrorType<'loadCustomFieldComponent', E>;
  hidden?: boolean;
  // TODO: need to be implement
  // validationFuncString?: (keyof Validators)[];
  // hiddenFunc?: (data: { item?: T }) => boolean;
  styleFunc?:
    | ((this: FieldConfigObj<T, DModel, K, E, C>) => elStyleObj)
    | (() => elStyleObj);
  /** the lazy load stand alone custom filed component which will render */

  controlType?: 'control' | 'group' | 'array' | 'none';
  disabled?: boolean;
  disabled$?: CustomSubscribable<boolean>;
  placeholder?: string;
  bodyStyle?: {
    dynamicFormControlComponent?: elStyleObj;
    field?: elStyleObj;
    label?: elStyleObj;
    input?: elStyleObj;
  };
  // TODO change to object { type: ValidatorFn|AsyncValidatorFn ,errorMessage: {}, filter:filterType<T,K> }
  validation?: ValidatorFn[];
  asyncValidation?: AsyncValidatorFn[];
  errorMessages?: { [error: string]: string };
  value?: T[K];
  // description?: string;
  setter?: CustomSubscribable<FieldEvent<T, SetterActionType, K>>;
  onChange?: ChangedCallBack<C, T[K]>;
  onInput?: (ctrl: C) => void;
  // TODO implement function
  onBlur?: (ctrl: C) => void;
  onClick?: (ctrl?: C) => void;
  registerControl?: RegisterControlCallBack<C, /** K */ string>;
  /**
   * can be use to get user username or password
   * username, password
   * or use advanced name to get email for example from the address and more of the user
   * request[anonymous_requester_email]
   */
  inputName?: string;
}

export type DynamicFormControl<
  T = any,
  K extends keyof T = keyof T,
  V extends T[K] = T[K],
  CT extends keyof FieldComponentType = keyof FieldComponentType
> = keyof any extends K
  ? FieldComponentTypeObject<any, string, any, CT>
  : {
      [KK in K]-?: FieldComponentTypeObject<T, KK, T[KK], CT>;
    }[K];

/** @author Mor Bargig <morbargig@gmail.com>*/

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DynamicFormControlArray<
  T = any,
  K extends keyof T = keyof T
  // V extends T[K] = T[K]
  // CT extends keyof FieldComponentType = keyof FieldComponentType
> extends Array<
    DynamicFormControl<
      T,
      K
      // , V
    >
  > {}

// tslint:disable-next-line:no-shadowed-variable
export type GetFieldType<T> = T extends DynamicFormControl<infer T>[]
  ? T
  : never;

export class NewFormGroup<
  T,
  ChildControl extends AbstractControl = AbstractControl
> extends FormGroup {
  override controls: {
    [key in keyof T]: ChildControl;
  };
}

export class NewFormArray<
  ChildControl extends AbstractControl = AbstractControl
> extends FormArray {
  override controls: ChildControl[];
}

export type FiledParentControl<
  T = any,
  ParentControl extends FormArray | FormGroup = FormArray | FormGroup,
  ChildControl extends AbstractControl = AbstractControl
> = ParentControl extends FormArray
  ? NewFormArray<ChildControl>
  : NewFormGroup<T, ChildControl>;

// interface User {
//   name: string;
//   age: number;
//   test: string[];
//   payment: { obj: { obj2: [{ obj3: string[][] }] }[] }[];
//   friends: string[][];
// }

// const simpleForm: DynamicFormControl<User>[] = [
//   {
//     field: 'friends',
//     type: 'FormArray',
//     data: {
//       formArrayConfig: {
//         type: 'FormArray',
//         field: '_',
//         data: {
//           formControlConfig: {
//             type: 'Default',
//           },
//         },
//       },
//     },
//   },
//   {
//     field: 'test',
//     type: 'FormArray',
//     bodyStyle: {},
//     data: {
//       formControlConfig: {
//         type: 'Default',
//         field: '_',
//       },
//     },
//   },
//   {
//     field: 'payment',
//     type: 'FormArray',
//     data: {
//       formGroupConfig: [
//         {
//           field: 'obj',
//           type: 'FormArray',
//           data: {
//             formGroupConfig: [
//               {
//                 field: 'obj2',
//                 type: 'FormArray',
//                 data: {
//                   formGroupConfig: [
//                     {
//                       field: 'obj3',
//                       type: 'FormArray',
//                       validation: [],
//                       data: {
//                         // formControlConfig: {
//                         //   field: '_',
//                         //   type: 'Default',
//                         // },
//                         formArrayConfig: {
//                           field: '_',
//                           type: 'FormArray',
//                           data: {
//                             // formGroupConfig: [],
//                             // formArrayConfig: [],
//                             formControlConfig: {
//                               field: '_',
//                               onChange: () => null,
//                               type: 'Default',
//                               data: {
//                                 // formGroupConfig: [],
//                                 // formControlConfig: {
//                                 //   field: '_',
//                                 //   type: 'FormArray',
//                                 // },
//                                 // formArrayConfig: [],
//                               },
//                             },
//                           },
//                         },
//                       },
//                     },
//                   ],
//                 },
//               },
//             ],
//           },
//         },
//       ],
//     },
//   },
//   {
//     field: 'age',
//     type: 'Default',
//     onChange: ({ currentValue, control }) => {
//       return;
//     },
//     value: 3,
//     // data: {
//     //   inputType: 'text',
//     //   // title$: of(),
//     // },
//   },
// ];

// // TODO add json convertor
// const obj = {
//   hello: 'World',
//   sayHello: function () {
//     console.log('I say Hello!');
//   }.toString(),
// };
// const myobj = JSON.parse(JSON.stringify(obj));
// myobj.sayHello = new Function('return (' + myobj.sayHello + ')')();
// myobj.sayHello();
