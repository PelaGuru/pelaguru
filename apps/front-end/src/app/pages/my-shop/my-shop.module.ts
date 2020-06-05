import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyShopRoutingModule } from './my-shop-routing.module';
import { MyShopComponent } from './my-shop.component';

@NgModule({
  declarations: [MyShopComponent],
  imports: [CommonModule, MyShopRoutingModule]
})
export class MyShopModule {}
