import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlantsComponent } from './plants.component';
import { PlantsCatalogueComponent } from './plants-catalogue/plants-catalogue.component';
import { ViewPlantComponent } from './view-plant/view-plant.component';

const routes: Routes = [
  {
    path: '',
    component: PlantsComponent,
    children: [
      { path: '', component: PlantsCatalogueComponent },
      { path: ':plantUsername', component: ViewPlantComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlantsRoutingModule {}
