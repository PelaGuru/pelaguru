import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllSellersComponent } from './all-sellers/all-sellers.component';
import { SellerManagementComponent } from './seller-management.component';
import { SellerRequestsComponent } from './seller-requests/seller-requests.component';

const routes: Routes = [
  {
    path: '',
    component: SellerManagementComponent,
    children: [
      { path: 'requests', component: SellerRequestsComponent },
      { path: 'all', component: AllSellersComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerManagementRoutingModule {}
