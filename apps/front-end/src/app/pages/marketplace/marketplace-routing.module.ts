import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketplaceComponent } from './marketplace.component';
import { ShopCatalogueComponent } from './shop-catalogue/shop-catalogue.component';

const routes: Routes = [
  {
    path: '',
    component: MarketplaceComponent,
    children: [{ path: '', component: ShopCatalogueComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketplaceRoutingModule {}
