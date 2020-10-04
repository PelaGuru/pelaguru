import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerManagementRoutingModule } from './seller-management-routing.module';
import { SellerManagementComponent } from './seller-management.component';
import { AllSellersComponent } from './all-sellers/all-sellers.component';
import { SellerRequestsComponent } from './seller-requests/seller-requests.component';

@NgModule({
  declarations: [
    SellerManagementComponent,
    AllSellersComponent,
    SellerRequestsComponent,
  ],
  imports: [CommonModule, SellerManagementRoutingModule],
})
export class SellerManagementModule {}
