import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserRole } from '@pelaguru/interfaces';
import { RoleGuard } from '../core/role-guard/role.guard';

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
        canActivate: [RoleGuard],
        data: {
          allowedRoles: [
            UserRole.Admin,
            UserRole.Moderator,
            UserRole.ResourcePerson,
          ],
        },
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./user-management/user-management.module').then(
            (m) => m.UserManagementModule
          ),
        canActivate: [RoleGuard],
        data: {
          allowedRoles: [UserRole.Admin],
        },
      },
      {
        path: 'sellers',
        loadChildren: () =>
          import('./seller-management/seller-management.module').then(
            (m) => m.SellerManagementModule
          ),
        canActivate: [RoleGuard],
        data: {
          allowedRoles: [
            UserRole.Admin,
            UserRole.Moderator,
            UserRole.ResourcePerson,
          ],
        },
      },
      {
        path: 'plants',
        loadChildren: () =>
          import('./plant-management/plant-management.module').then(
            (m) => m.PlantManagementModule
          ),
        canActivate: [RoleGuard],
        data: {
          allowedRoles: [UserRole.Admin, UserRole.Moderator],
        },
      },
      {
        path: 'diseases',
        loadChildren: () =>
          import('./diseas-management/diseas-management.module').then(
            (m) => m.DiseasManagementModule
          ),
        canActivate: [RoleGuard],
        data: {
          allowedRoles: [UserRole.Admin, UserRole.Moderator],
        },
      },
      {
        path: 'chemicals',
        loadChildren: () =>
          import('./chemical-management/chemical-management.module').then(
            (m) => m.ChemicalManagementModule
          ),
        canActivate: [RoleGuard],
        data: {
          allowedRoles: [
            UserRole.Admin,
            UserRole.Moderator,
            UserRole.ResourcePerson,
          ],
        },
      },
      {
        path: 'messages',
        loadChildren: () =>
          import('./messages/messages.module').then((m) => m.MessagesModule),
        canActivate: [RoleGuard],
        data: {
          allowedRoles: [UserRole.Admin],
        },
      },
      {
        path: 'ml-model',
        loadChildren: () =>
          import('./ml-model/ml-model.module').then((m) => m.MlModelModule),
        canActivate: [RoleGuard],
        data: {
          allowedRoles: [UserRole.Admin],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
