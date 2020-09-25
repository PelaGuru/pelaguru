import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from './shop.component';
import { ShopItemsOverviewComponent } from './shop-items-overview/shop-items-overview.component';
import { AddShopItemComponent } from './add-shop-item/add-shop-item.component';
import { EditShopItemComponent } from './edit-shop-item/edit-shop-item.component';
import { ViewShopItemComponent } from './view-shop-item/view-shop-item.component';

const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
    children: [
      { path: '', component: ShopItemsOverviewComponent },
      { path: 'add-item', component: AddShopItemComponent },
      { path: 'edit-item/:id', component: EditShopItemComponent },
      { path: ':id', component: ViewShopItemComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShopRoutingModule {}
