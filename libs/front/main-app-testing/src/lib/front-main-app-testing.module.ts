import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { FormsComponent } from './pages/forms/forms.component';
import { FrontDynamicFormsModule } from '@fnx-nx/front/dynamic-forms';
import { HttpClientModule } from '@angular/common/http';

export const frontMainAppTestingRoutes: Route[] = [
  { path: 'forms', component: FormsComponent },
  { path: 'table' },
  { path: '*', redirectTo: 'forms' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(frontMainAppTestingRoutes),
    HttpClientModule,
    FrontDynamicFormsModule,
  ],
  declarations: [FormsComponent],
})
export class FrontMainAppTestingModule {}
