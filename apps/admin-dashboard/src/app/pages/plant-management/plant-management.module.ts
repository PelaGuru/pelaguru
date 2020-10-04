import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlantManagementRoutingModule } from './plant-management-routing.module';
import { PlantManagementComponent } from './plant-management.component';
import { AllPlantsComponent } from './all-plants/all-plants.component';
import { AddPlantComponent } from './add-plant/add-plant.component';
import { DetailsPlantComponent } from './details-plant/details-plant.component';
import { EditPlantComponent } from './edit-plant/edit-plant.component';

@NgModule({
  declarations: [
    PlantManagementComponent,
    AllPlantsComponent,
    AddPlantComponent,
    DetailsPlantComponent,
    EditPlantComponent,
  ],
  imports: [CommonModule, PlantManagementRoutingModule],
})
export class PlantManagementModule {}
