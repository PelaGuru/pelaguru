import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlantsRoutingModule } from './plants-routing.module';
import { PlantsComponent } from './plants.component';
import { PlantsCatalogueComponent } from './plants-catalogue/plants-catalogue.component';
import { SharedModule } from '../../shared/shared.module';
import { ViewPlantComponent } from './view-plant/view-plant.component';

@NgModule({
  declarations: [PlantsComponent, PlantsCatalogueComponent, ViewPlantComponent],
  imports: [CommonModule, PlantsRoutingModule, SharedModule]
})
export class PlantsModule {}
