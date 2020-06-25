import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiseasesRoutingModule } from './diseases-routing.module';
import { DiseasesComponent } from './diseases.component';
import { DiseasesCatalogueComponent } from './diseases-catalogue/diseases-catalogue.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [DiseasesComponent, DiseasesCatalogueComponent],
  imports: [CommonModule, DiseasesRoutingModule, SharedModule]
})
export class DiseasesModule {}
