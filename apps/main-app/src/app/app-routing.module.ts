import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const ROUTES: Routes = [
  { path: '', component: AppComponent },
  {
    path: 'testing',
    loadChildren: () =>
      import('@fnx-nx/front/main-app-testing').then(
        (m) => m.FrontMainAppTestingModule
      ),
  },
];
