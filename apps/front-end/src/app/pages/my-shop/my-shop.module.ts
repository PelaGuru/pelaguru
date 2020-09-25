import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyShopRoutingModule } from './my-shop-routing.module';
import { MyShopComponent } from './my-shop.component';
import { PaymentsComponent } from './payments/payments.component';
import { SharedModule } from '../../shared/shared.module';
import { ShopSidenavComponent } from './shop-sidenav/shop-sidenav.component';

@NgModule({
  declarations: [MyShopComponent, PaymentsComponent, ShopSidenavComponent],
  imports: [CommonModule, MyShopRoutingModule, SharedModule],
})
export class MyShopModule {}
