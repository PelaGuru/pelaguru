import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlantManagementComponent } from './plant-management.component';
import { AllPlantsComponent } from './all-plants/all-plants.component';
import { AddPlantComponent } from './add-plant/add-plant.component';
import { DetailsPlantComponent } from './details-plant/details-plant.component';
import { EditPlantComponent } from './edit-plant/edit-plant.component';

const routes: Routes = [
  {
    path: '',
    component: PlantManagementComponent,
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: 'all', component: AllPlantsComponent },
      { path: 'add', component: AddPlantComponent },
      { path: ':plant_id', component: DetailsPlantComponent },
      { path: ':plant_id/edit', component: EditPlantComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlantManagementRoutingModule {}
