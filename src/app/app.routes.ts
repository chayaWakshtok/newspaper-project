import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'seretary', pathMatch: 'full' },
  {
    path: 'seretary', loadComponent: () => import('./components/layout/layout.component').then(m => m.LayoutComponent),
    children: [{ path: '', loadComponent: () => import('./components/secretary/secretary.component').then(m => m.SecretaryComponent) },
    { path: 'add-size', loadComponent: () => import('./components/add-size-post/add-size-post.component').then(m => m.AddSizePostComponent) }
    ]
  },
  {
    path: 'draw', loadComponent: () => import('./components/layout/layout.component').then(m => m.LayoutComponent),
    children: [{ path: '', loadComponent: () => import('./components/drawing/drawing.component').then(m => m.DrawingComponent) },
    ]
  },
];
