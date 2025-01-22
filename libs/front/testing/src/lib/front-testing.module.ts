import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import {
  DynamicFormBuilderService,
} from '@softbar/front/dynamic-forms';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export const frontTestingRoutes: Route[] = [
  { path: 'forms', loadComponent:()=> import('./pages/forms/forms.component').then(x=>x.FormsComponent) },
  // { path: 'table' },
  { path: '**', redirectTo: 'forms' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(frontTestingRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [DynamicFormBuilderService, FormBuilder],
})
export class FrontTestingModule {}
