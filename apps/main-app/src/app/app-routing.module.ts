import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  { path: '', loadComponent: ()=>  import('./app.component').then(m => m.AppComponent) },
  {
    path: 'testing',
    // canLoad:[],
    loadChildren: () =>
      import('@softbar/front/testing').then((m) => m.FrontTestingModule),
  },
  { path: '**', redirectTo: 'testing' },
];
