import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { FormsComponent } from './pages/forms/forms.component';
import {
  DynamicFormBuilderService,
  FrontDynamicFormsModule,
} from '@fnx-nx/front/dynamic-forms';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';

export const frontMainAppTestingRoutes: Route[] = [
  { path: 'forms', component: FormsComponent },
  // { path: 'table' },
  { path: '*', redirectTo: 'forms' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(frontMainAppTestingRoutes),
    HttpClientModule,
    FrontDynamicFormsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DynamicFormBuilderService, FormBuilder],
  declarations: [FormsComponent],
})
export class FrontTestingModule {}
