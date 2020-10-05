import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChemicalManagementRoutingModule } from './chemical-management-routing.module';
import { ChemicalManagementComponent } from './chemical-management.component';
import { DetailChemicalComponent } from './detail-chemical/detail-chemical.component';
import { AllChemicalsComponent } from './all-chemicals/all-chemicals.component';
import { AddChemicalComponent } from './add-chemical/add-chemical.component';
import { EditChemicalComponent } from './edit-chemical/edit-chemical.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    ChemicalManagementComponent,
    DetailChemicalComponent,
    AllChemicalsComponent,
    AddChemicalComponent,
    EditChemicalComponent,
  ],
  imports: [CommonModule, ChemicalManagementRoutingModule, SharedModule],
})
export class ChemicalManagementModule {}
