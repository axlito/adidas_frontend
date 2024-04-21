import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/product-list/product-list.component').then((c) => c.ProductListComponent),
  }
];
