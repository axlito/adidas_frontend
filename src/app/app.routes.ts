import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import {ProductDetailsComponent} from "./pages/product-details/product-details.component";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/product-list/product-list.component').then((c) => c.ProductListComponent),
  },{
    path: 'product',
    children: [
      { path: '', component: ProductListComponent },
      { path: ':id', component: ProductDetailsComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];
