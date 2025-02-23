import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: 'testing',
    loadChildren: () =>
      import('@softbar/front/testing').then((m) => m.FrontTestingModule),
  },
  { path: '**', redirectTo: 'testing' },
];
