import { CdkStep } from '@angular/cdk/stepper';
import { AsyncValidatorFn, FormGroup, ValidatorFn } from '@angular/forms';
import { NumRange } from './base';
import { DynamicFormControl } from './field-config';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';

// type ObjectChild<T> = T extends Object ? T : null
type onlyObject<T> = Exclude<
  Exclude<Exclude<Exclude<T, number>, string>, []>,
  boolean
>;

export type DynamicSteppedForm<
  T = any,
  K extends keyof T & string = T extends object ? keyof T & string : any
> = {
  /** right sidebar title and default step page title */
  stepTitle?: string;
  /** step page title */
  stepInnerPageTitle?: string;
  // contentTitle?: string;
  controlName?: keyof T & string;
  mode?: SteppedFormMode;
  isDisable?: boolean;
  group: DynamicFormControl<onlyObject<T[K]> & T>[];
  form?: FormGroup;
  percent?: NumRange<100>;
  /** make wizard step summary on the next step button right side */
  summaryHtml$?: Observable<Component['template']>;
  /**
   * default 1
   * 2 will resize the step to be larger by 2
   * 0.5 will to the opposite resize the sep to be smaller by 2
   */
  /**
   * @description
   * The list of validators applied to a control.
   */
  validators?: ValidatorFn[];
  /**
   * @description
   * The list of async validators applied to control.
   */
  asyncValidators?: AsyncValidatorFn[];
  errorMessages?: { [error: string]: string };
  size?: number;
  stepNumber?: number | string;
  // markLine?: boolean;
  isActive?: boolean;
  disclamer?: string;
  hideButton?: boolean;
} & Partial<CdkStep['stepControl']>;

export enum SteppedFormMode {
  Default,
}

export enum DynamicFormStepMode {
  TableCell,
}

export enum SteppedFormHeaderMode {
  TableCell, // Default
}

export enum SteppedFormFooterMode {}
// Default,
