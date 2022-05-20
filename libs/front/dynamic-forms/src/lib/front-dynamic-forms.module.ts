export * from './forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { ValidationMessagesComponent } from './forms/core/components/validation-messages/validation-messages.component';
import { DynamicFormControlComponent } from './forms/core/components/dynamic-form-control/dynamic-form-control.component';
import { DynamicFormGroupComponent } from './forms/core/components/dynamic-form-group/dynamic-form-group.component';
import { DynamicSteppedFormComponent } from './forms/core/components/dynamic-stepped-form/dynamic-stepped-form.component';
import { DynamicFieldDirective } from './forms/core/directives/dynamic-field.directive';
import { CurrencyFormatterDirective } from './forms/core/directives/currency-field.directive';
import { FormTextComponent } from './forms/form-fields/form-text/form-text.component';
import { FormArrayComponent } from './forms/form-fields/form-array/form-array.component';
import { FormStepperComponent } from './forms/core/components/form-stepper/form-stepper.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FrontDynamicFormsPipeModule } from './forms/core/pipes/pipes.module';
import { FormGroupComponent } from './forms/form-fields/form-group/form-group.component';

const EXPORTED: NgModule['declarations'] = [
  ValidationMessagesComponent,
  DynamicFormControlComponent,
  DynamicFormGroupComponent,
  DynamicSteppedFormComponent,
  // DynamicSteppedFormComponent
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
  FormGroupComponent,
];

@NgModule({
  declarations: [...DIRECTIVES, ...COMPONENTS, ...EXPORTED, ...FIELDS],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CdkStepperModule,
    FrontDynamicFormsPipeModule,
  ],
  providers: [],
  exports: [...EXPORTED, ...FIELDS],
})
export class FrontDynamicFormsModule {}
