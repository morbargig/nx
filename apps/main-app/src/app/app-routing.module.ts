import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const ROUTES: Routes = [
  // { path: '', component: AppComponent },
  {
    path: 'testing',
    // canLoad:[],
    loadChildren: () =>
      import('@softbar/front/testing').then((m) => m.FrontTestingModule),
  },
  { path: '**', redirectTo: 'testing' },
];
