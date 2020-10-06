import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiseasManagementRoutingModule } from './diseas-management-routing.module';
import { DiseasManagementComponent } from './diseas-management.component';
import { EditDiseasComponent } from './edit-diseas/edit-diseas.component';
import { AddDiseasComponent } from './add-diseas/add-diseas.component';
import { AllDiseasesComponent } from './all-diseases/all-diseases.component';
import { DetailDiseasComponent } from './detail-diseas/detail-diseas.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    DiseasManagementComponent,
    EditDiseasComponent,
    AddDiseasComponent,
    AllDiseasesComponent,
    DetailDiseasComponent,
  ],
  imports: [CommonModule, DiseasManagementRoutingModule, SharedModule],
})
export class DiseasManagementModule {}
