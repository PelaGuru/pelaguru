import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { SellerRequestComponent } from './seller-request/seller-request.component';

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
            m => m.DiseasesIdentifierModule
          )
      },
      {
        path: 'plants',
        loadChildren: () =>
          import('./plants/plants.module').then(m => m.PlantsModule)
      },
      {
        path: 'diseases',
        loadChildren: () =>
          import('./diseases/diseases.module').then(m => m.DiseasesModule)
      },
      {
        path: 'marketplace',
        loadChildren: () =>
          import('./marketplace/marketplace.module').then(
            m => m.MarketplaceModule
          )
      },
      {
        path: 'my-shop',
        loadChildren: () =>
          import('./my-shop/my-shop.module').then(m => m.MyShopModule)
      },
      {
        path: 'seller-request',
        component: SellerRequestComponent
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then(m => m.ProfileModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
