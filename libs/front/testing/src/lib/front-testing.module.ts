import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { FormsComponent } from './pages/forms/forms.component';
import {
  DynamicFormBuilderService,
  FrontDynamicFormsModule,
} from '@softbar/front/dynamic-forms';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export const frontTestingRoutes: Route[] = [
  { path: 'forms', component: FormsComponent },
  // { path: 'table' },
  { path: '**', redirectTo: 'forms' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(frontTestingRoutes),
    HttpClientModule,
    FrontDynamicFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [DynamicFormBuilderService, FormBuilder],
  declarations: [FormsComponent],
})
export class FrontTestingModule {}
