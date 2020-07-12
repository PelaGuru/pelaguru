import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { SharedModule } from '../../../shared/shared.module';
import { AddShopItemComponent } from './add-shop-item/add-shop-item.component';
import { ShopItemsOverviewComponent } from './shop-items-overview/shop-items-overview.component';
import { ViewShopItemComponent } from './view-shop-item/view-shop-item.component';
import { EditShopItemComponent } from './edit-shop-item/edit-shop-item.component';
import { ShopItemCardComponent } from './shop-item-card/shop-item-card.component';

@NgModule({
  declarations: [
    ShopComponent,
    AddShopItemComponent,
    ShopItemsOverviewComponent,
    ViewShopItemComponent,
    EditShopItemComponent,
    ShopItemCardComponent
  ],
  imports: [CommonModule, ShopRoutingModule, SharedModule]
})
export class ShopModule {}
