import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { MarketplaceComponent } from './marketplace.component';

@NgModule({
  declarations: [MarketplaceComponent],
  imports: [CommonModule, MarketplaceRoutingModule]
})
export class MarketplaceModule {}
