import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../../../shared/shared.module';
import { BehaviorChartComponent } from './charts/behavior-chart/behavior-chart.component';
import { PopularProductsComponent } from './tables/popular-products/popular-products.component';
import { UserReviewItemComponent } from './user-review-item/user-review-item.component';

@NgModule({
  declarations: [
    DashboardComponent,
    BehaviorChartComponent,
    PopularProductsComponent,
    UserReviewItemComponent
  ],
  imports: [CommonModule, DashboardRoutingModule, SharedModule]
})
export class DashboardModule {}
