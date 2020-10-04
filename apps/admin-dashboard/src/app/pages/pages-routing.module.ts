import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./user-management/user-management.module').then(
            (m) => m.UserManagementModule
          ),
      },
      {
        path: 'sellers',
        loadChildren: () =>
          import('./seller-management/seller-management.module').then(
            (m) => m.SellerManagementModule
          ),
      },
      {
        path: 'plants',
        loadChildren: () =>
          import('./plant-management/plant-management.module').then(
            (m) => m.PlantManagementModule
          ),
      },
      {
        path: 'diseases',
        loadChildren: () =>
          import('./diseas-management/diseas-management.module').then(
            (m) => m.DiseasManagementModule
          ),
      },
      {
        path: 'chemicals',
        loadChildren: () =>
          import('./chemical-management/chemical-management.module').then(
            (m) => m.ChemicalManagementModule
          ),
      },
      {
        path: 'messages',
        loadChildren: () =>
          import('./messages/messages.module').then((m) => m.MessagesModule),
      },
      {
        path: 'ml-model',
        loadChildren: () =>
          import('./ml-model/ml-model.module').then((m) => m.MlModelModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
