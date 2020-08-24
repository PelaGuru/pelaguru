import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRequestRoutingModule } from './seller-request-routing.module';
import { SellerRequestComponent } from './seller-request.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [SellerRequestComponent],
  imports: [CommonModule, SellerRequestRoutingModule, SharedModule]
})
export class SellerRequestModule {}
