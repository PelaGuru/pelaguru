import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiseasesRoutingModule } from './diseases-routing.module';
import { DiseasesComponent } from './diseases.component';
import { DiseasesCatalogueComponent } from './diseases-catalogue/diseases-catalogue.component';
import { SharedModule } from '../../shared/shared.module';
import { ViewDiseaseComponent } from './view-disease/view-disease.component';

@NgModule({
  declarations: [
    DiseasesComponent,
    DiseasesCatalogueComponent,
    ViewDiseaseComponent
  ],
  imports: [CommonModule, DiseasesRoutingModule, SharedModule]
})
export class DiseasesModule {}
