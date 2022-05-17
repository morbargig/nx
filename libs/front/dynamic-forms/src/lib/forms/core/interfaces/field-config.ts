import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { NextObserver, Observable } from 'rxjs';
import { OnDestroy, Type } from '@angular/core';
import { ChangedCallBack } from './callbacks';
import { FormTextComponent } from '../../form-fields/form-text/form-text.component';
import { BaseFieldComponent } from '../directives/base-field.directive';
import { FieldEvent } from './events';
import { FormArrayComponent } from '../../form-fields/form-array/form-array.component';
import { asConst } from '../functions/as-const.func';
import { Validators } from '@angular/forms';

export type elStyleObj = {
  styleClass?: string;
  style?: { [k: string]: string };
  styleClassObj?: { [k: string]: boolean };
};

export enum FormFieldType {
  /** basic component made to answer primitive values and input known type attribute types types */
  Default = 'Default',
  /** this component made to answer arrays types */
  FormArray = 'FormArray',
}

class FormsFieldClassType<T = any, K extends keyof T = keyof T> {
  FieldDicType = asConst<{
    [key in keyof typeof FormFieldType]-?: Type<BaseFieldComponent>;
  }>()({
    Default: FormTextComponent as Type<FormTextComponent<T, K>>,
    FormArray: FormArrayComponent as Type<FormArrayComponent<T, K>>,
  } as const);
}

type FieldComponentType<
  T = any,
  K extends keyof T = keyof T
> = FormsFieldClassType<T, K>['FieldDicType'];

export const FormFieldsDic = asConst<FieldComponentType>()({
  Default: FormTextComponent,
  FormArray: FormArrayComponent,
} as const);

// tslint:disable-next-line:no-empty-interface
export type BaseFieldData<
  T = any,
  K extends keyof T = keyof T /** will have used on extends components */
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
  group: G;
  id: string;
} & Partial<OnDestroy>;

export type FieldComponentTypeObject<
  T = any,
  K extends keyof T = keyof T,
  V extends T[K] = T[K],
  CT extends keyof FieldComponentType = keyof FieldComponentType
> = {
  [E in CT]?: FieldConfigObj<
    T,
    FieldComponentType<T, K>[E] extends Type<infer C> // when you chose type this will be the data type of this component
      ? C extends BaseFieldComponent<T, infer D>
        ? D
        : any
      : any,
    K,
    E
  >;
}[CT];

export interface FieldConfigObj<
  T = any,
  DModel extends BaseFieldData<T, K> = BaseFieldData<T>,
  K extends keyof { [key in keyof T]: any } = keyof { [key in keyof T]: any },
  E extends keyof typeof FormFieldType = keyof typeof FormFieldType,
  C extends AbstractControl = AbstractControl
> {
  field?: K & string;
  label?: string;
  type?: E;
  // parsedData?: (val: T[K]) => any;                            // parse the cell data // (date) => moment(date).format('DD.MM.YY')
  // parsedFullData?: (item: T) => any;                   // get the cell data from the row item // (item)=> item.vatPrice + item.basePrice
  data?: DModel;
  // colspan?: number;
  hidden?: boolean;
  validationFuncString?: (keyof Validators)[];
  // hiddenFunc?: (data: { item?: T }) => boolean;
  styleFunc?:
    | ((this: FieldConfigObj<T, DModel, K, E, C>) => elStyleObj)
    | (() => elStyleObj);
  customFieldComponent?: Type<BaseFieldComponent<T, DModel, K>>;
  controlType?: 'control' | 'group' | 'array' | 'none';
  disabled?: boolean;
  disabled$?: CustomSubscribable<boolean>;
  placeholder?: string;
  bodyStyle?: {
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
  setter?: CustomSubscribable<FieldEvent<T>>;
  onChange?: ChangedCallBack<C, T[K]>;
  onBlur?: (ctrl: C) => void;
  onClick?: (val: T[K], item?: T) => void;
  registerControl?: (ctrl: C) => void;
}

export type CustomSubscribable<T = any> = (Observable<T> &
  Partial<NextObserver<T>>) & {
  new (): void;
};

export type DynamicFormControl<
  T = any,
  K extends keyof T = keyof T,
  V extends T[K] = T[K],
  CT extends keyof FieldComponentType = keyof FieldComponentType
> = {
  [KK in K]-?: FieldComponentTypeObject<T, KK, T[KK], CT>;
}[K];

/** @author Mor Bargig <morbargig@gmail.com>*/
export type DynamicFormControlArray<
  T = any,
  K extends keyof T = keyof T
  // V extends T[K] = T[K]
  // CT extends keyof FieldComponentType = keyof FieldComponentType
> = Array<
  DynamicFormControl<
    T,
    K
    // , V
  >
>;

// tslint:disable-next-line:no-shadowed-variable
export type getFieldType<T> = T extends DynamicFormControl<infer T>[]
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

// class NewFormGroup<T, ChildControl extends AbstractControl = AbstractControl> extends OmitClass<FormGroup, 'controls'>(FormGroup as any, ['controls']) {
//   controls: {
//     [key in keyof T]: ChildControl;
//   };
// }

// class NewFormArray<ChildControl extends AbstractControl = AbstractControl> extends OmitClass<FormGroup, 'controls'>(FormGroup as any, ['controls']) {
//   controls: ChildControl[]
// }

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
//   payment: [{ obj: [{ obj2: [{ obj3: string[][] }] }] }];
// }

// const simpleTest: DynamicFormControl<User>[] = [
//   {
//     field: 'test',
//     type: 'FormArray',
//     bodyStyle: {},
//     data: {
//       formControlConfig: {
//         type: 'Default',
//         field: '',
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
//     data: {
//       inputType: 'text',
//       // title$: of(),
//     },
//   },
// ];

// TODO add json convertor
//   var obj = {
//     hello: "World",
//     sayHello: (function() {
//         console.log("I say Hello!");
//     }).toString()
// };
// var myobj = JSON.parse(JSON.stringify(obj));
// myobj.sayHello = new Function("return ("+myobj.sayHello+")")();
// myobj.sayHello();
