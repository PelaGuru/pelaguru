import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SellerRequestComponent } from './seller-request.component';

const routes: Routes = [{ path: '', component: SellerRequestComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRequestRoutingModule {}
