import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('@prueba-bi/todos').then((m) => m.TodosComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('@prueba-bi/error').then((e) => e.ErrorComponent)
  }
];
