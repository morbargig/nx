import { BaseFieldData } from '../../core/interfaces/field-config';
import { Type } from '@angular/core';
import { KeyValuePair } from '../../core/interfaces/key-value-pair';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
export interface FormRadioData<T = any, K extends keyof T = keyof T, Enum = any>
  extends BaseFieldData<T, K> {
  keyValuePairs: Observable<KeyValuePair<Enum>[]>;
  classTemplate?: Type<{
    option: KeyValuePair<Enum>;
    control?: FormControl;
    // isSelectedFunc?: (...args: any[]) => boolean;
  }>;
  // isSelectedFunc?: (...args: any[]) => boolean;
  // htmlTemplate: (item: KeyValuePair<Enum>) => string;
}

// interface ButtonData<Enum> {
//   enum: Enum;
//   // enum2: Enum;
//   // keyValuePairs: KeyValuePair<Enum>;
//   // classTemplate?: Type<KeyValuePair<T, K>>;
//   // htmlTemplate: (item: this['keyValuePairs'][number]) => string;
// }

// class BuildDataWarper {
//   // buildData<Enum>(obj?: ButtonData<Enum>) {
//   //   return obj;
//   // }
//   buildData = <Enum>(obj?: ButtonData<Enum>) => [obj];
// }
// export interface FormButtonData<T = any, K extends keyof T = keyof T>
//   extends BaseFieldData<T, K> {
//   /**
//    *  buildDataFunc: function buildDataFunc< <myEnum> >(
//    *    obj = {
//    *            enum: <myEnum>,
//    *            keyValuePairs: <my-option>[],
//    *            htmlTemplate: (item) => `<div> ${...<html-as-string>}</div>`,
//    *           }
//    * ) {
//    *     return obj;
//    *   },
//    */
//   buildDataFunc: BuildDataWarper['buildData'];
// }
