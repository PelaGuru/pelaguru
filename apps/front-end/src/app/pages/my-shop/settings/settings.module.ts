import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { SharedModule } from '../../../shared/shared.module';
import { ShopDetailsComponent } from './shop-details/shop-details.component';
import { EditShopDetailsComponent } from './edit-shop-details/edit-shop-details.component';
import { ShopVisibilityComponent } from './settings-list/shop-visibility/shop-visibility.component';
import { ShopKeyWordsComponent } from './settings-list/shop-key-words/shop-key-words.component';
import { ShopLocationComponent } from './settings-list/shop-location/shop-location.component';
import { DeleteShopComponent } from './settings-list/delete-shop/delete-shop.component';

@NgModule({
  declarations: [
    SettingsComponent,
    ShopDetailsComponent,
    EditShopDetailsComponent,
    ShopVisibilityComponent,
    ShopKeyWordsComponent,
    ShopLocationComponent,
    DeleteShopComponent
  ],
  imports: [CommonModule, SettingsRoutingModule, SharedModule]
})
export class SettingsModule {}
