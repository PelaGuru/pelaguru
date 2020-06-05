import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlantsRoutingModule } from './plants-routing.module';
import { PlantsComponent } from './plants.component';

@NgModule({
  declarations: [PlantsComponent],
  imports: [CommonModule, PlantsRoutingModule]
})
export class PlantsModule {}
