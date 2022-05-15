import {CdkStep} from '@angular/cdk/stepper';
import {FormGroup} from '@angular/forms';
import {DynamicFormControl} from './field-config';

// type ObjectChild<T> = T extends Object ? T : null
type onlyObject<T> = Exclude<Exclude<Exclude<Exclude<T, number>, string>, []>, boolean>
export type DynamicSteppedForm<T = any, K extends keyof T & string = T extends object ? keyof T & string : any> = {
  title?: keyof T & string;
  mode?: SteppedFormMode;
  isDisable?: boolean;
  group: DynamicFormControl<onlyObject<T[K]> & T>[];
  form?: FormGroup;
} & CdkStep['stepControl']

export enum SteppedFormMode {
  Default,
  // Tabbed,
  // Bulleted,
  // Circled,
}

export enum DynamicFormStepMode {
  Default,
  // Inline,
  // TableCell,
  // Custom
}

export enum SteppedFormFooterMode {
  Default,
  None,
  // Arrows,
  // Paging,
}
