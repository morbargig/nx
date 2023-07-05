import { MatRadioModule } from '@angular/material/radio';
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
import { FormRadioComponent } from './forms/form-fields/form-radio/form-radio.component';
import { DynamicComponentDirective } from './forms/core/directives/dynamic-component.directive';
import { DynamicComponentComponent } from './forms/core/components/dynamic-component/dynamic-component.component';
import { OptionsScrollDirective } from './forms/core/directives/options-scroll.directive';
import { FormAutocompleteComponent } from './forms/form-fields/form-autocomplete/form-autocomplete.component';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { HighlighterPipe } from './forms/core/pipes/highlighter.pipe';
import { FormCheckboxComponent } from './forms/form-fields/form-checkbox/form-checkbox.component';
import { FormSelectComponent } from './forms/form-fields/form-select/form-select.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

export * from './forms';

const EXPORTED: NgModule['declarations'] = [
  ValidationMessagesComponent,
  DynamicFormControlComponent,
  DynamicFormGroupComponent,
  DynamicSteppedFormComponent,
  DynamicComponentComponent,
  // DynamicSteppedFormComponent
];

const DIRECTIVES: NgModule['declarations'] = [
  DynamicFieldDirective,
  DynamicComponentDirective,
  CurrencyFormatterDirective,
  HighlighterPipe,
];
const COMPONENTS: NgModule['declarations'] = [];
const FIELDS: NgModule['declarations'] = [
  FormTextComponent,
  FormArrayComponent,
  FormStepperComponent,
  FormGroupComponent,
  FormRadioComponent,
  FormAutocompleteComponent,
  FormCheckboxComponent,
  FormSelectComponent,
];
const EXPORTEDMODULE: NgModule['imports'] & NgModule['exports'] = [
  ReactiveFormsModule,
];

const STANDALONEMODULE: NgModule['imports'] & NgModule['exports'] = [
  OptionsScrollDirective,
];

// ,

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CdkStepperModule,
    MatFormFieldModule,
    MatInputModule,
    ...EXPORTEDMODULE,
    ...STANDALONEMODULE,
    MatAutocompleteModule,
    FrontDynamicFormsPipeModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
  ],
  declarations: [...DIRECTIVES, ...COMPONENTS, ...EXPORTED, ...FIELDS],
  exports: [...EXPORTED, ...FIELDS, ...EXPORTEDMODULE],
})
export class FrontDynamicFormsModule {}
