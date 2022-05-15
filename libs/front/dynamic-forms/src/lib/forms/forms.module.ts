import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicFormGroupComponent} from './core/components/dynamic-form-group/dynamic-form-group.component';
import {DynamicFormControlComponent} from './core/components/dynamic-form-control/dynamic-form-control.component';
import {ValidationMessagesComponent} from './core/components/validation-messages/validation-messages.component';
import {DynamicFieldDirective} from './core/directives/dynamic-field.directive';
import {ControlErrorsMapPipe} from './core/pipes/has-error.pipe';
import {IsArrayControlPipe} from './core/pipes/is-array-control.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CurrencyFormatterDirective} from './core/directives/currency-field.directive';
import {FormTextComponent} from './form-fields/form-text/form-text.component';
import {FormArrayComponent} from './form-fields/form-array/form-array.component';
import {FormArrayControlsFilterPipe} from './core/pipes/form-array-control-filter';
import {DynamicSteppedFormComponent} from "./core/components/dynamic-stepped-form/dynamic-stepped-form.component";
import {FormStepperComponent} from "./core/components/form-stepper/form-stepper.component";

const EXPORTED: NgModule['declarations'] = [
  ValidationMessagesComponent,
  DynamicFormControlComponent,
  DynamicFormGroupComponent,
  DynamicSteppedFormComponent
  // DynamicSteppedFormComponent
];
const PIPES: NgModule['declarations'] = [
  ControlErrorsMapPipe,
  FormArrayControlsFilterPipe,
  IsArrayControlPipe
];
const DIRECTIVES: NgModule['declarations'] = [
  DynamicFieldDirective,
  CurrencyFormatterDirective,
];
const COMPONENTS: NgModule['declarations'] = [];
const FIELDS: NgModule['declarations'] = [
  FormTextComponent,
  FormArrayComponent,
  FormStepperComponent,
];

@NgModule({
  declarations: [
    ...PIPES,
    ...DIRECTIVES,
    ...COMPONENTS,
    ...EXPORTED,
    ...FIELDS,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CdkStepperModule,
  ],
  exports: [...EXPORTED, ...FIELDS],
})
export class DynamicFormsModule {
}
