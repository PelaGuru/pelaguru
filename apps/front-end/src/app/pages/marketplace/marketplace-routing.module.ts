import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarketplaceComponent } from './marketplace.component';
import { ShopCatalogueComponent } from './shop-catalogue/shop-catalogue.component';
import { ViewShopComponent } from './view-shop/view-shop.component';
import { ShopItemComponent } from './view-shop/shop-item/shop-item.component';

const routes: Routes = [
  {
    path: '',
    component: MarketplaceComponent,
    children: [
      { path: '', component: ShopCatalogueComponent },
      { path: ':shopname', component: ViewShopComponent },
      { path: ':shopname/:id', component: ShopItemComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketplaceRoutingModule {}
