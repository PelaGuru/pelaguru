import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { MarketplaceComponent } from './marketplace.component';
import { ShopCatalogueComponent } from './shop-catalogue/shop-catalogue.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [MarketplaceComponent, ShopCatalogueComponent],
  imports: [CommonModule, MarketplaceRoutingModule, SharedModule]
})
export class MarketplaceModule {}
