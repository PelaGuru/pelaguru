import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { SellerRequestComponent } from './seller-request/seller-request.component';
import { UserRole } from '@pelaguru/interfaces';
import { PageGuard } from '../core/page-guard/page.guard';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      {
        path: 'diseases-identifier',
        loadChildren: () =>
          import('./diseases-identifier/diseases-identifier.module').then(
            (m) => m.DiseasesIdentifierModule
          ),
        canActivate: [PageGuard],
      },
      {
        path: 'plants',
        loadChildren: () =>
          import('./plants/plants.module').then((m) => m.PlantsModule),
      },
      {
        path: 'diseases',
        loadChildren: () =>
          import('./diseases/diseases.module').then((m) => m.DiseasesModule),
      },
      {
        path: 'marketplace',
        loadChildren: () =>
          import('./marketplace/marketplace.module').then(
            (m) => m.MarketplaceModule
          ),
      },
      {
        path: 'my-shop',
        loadChildren: () =>
          import('./my-shop/my-shop.module').then((m) => m.MyShopModule),
        data: {
          allowedRoles: [UserRole.Vendor],
        },
        canActivate: [PageGuard],
      },
      {
        path: 'seller-request',
        loadChildren: () =>
          import('./seller-request/seller-request.module').then((m) => m.SellerRequestModule),
        canActivate: [PageGuard],
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
        canActivate: [PageGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
