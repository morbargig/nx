import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { DynamicFormBuilderService } from '@softbar/front/dynamic-forms';
import { FormBuilder } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

export const frontTestingRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./testing.component').then((x) => x.TestingComponent),
  },
  {
    path: 'forms',
    loadComponent: () =>
      import('./pages/forms/forms.component').then((x) => x.FormsComponent),
  },
  {
    path: 'table',
    loadComponent: () =>
      import('./pages/table/table.component').then(
        (x) => x.TestingTableComponent
      ),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(frontTestingRoutes),
    TranslateModule.forRoot(),
  ],
  providers: [DynamicFormBuilderService, FormBuilder],
})
export class FrontTestingModule {}
