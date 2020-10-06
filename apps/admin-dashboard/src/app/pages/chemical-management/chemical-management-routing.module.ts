import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChemicalManagementComponent } from './chemical-management.component';
import { DetailChemicalComponent } from './detail-chemical/detail-chemical.component';
import { AllChemicalsComponent } from './all-chemicals/all-chemicals.component';
import { AddChemicalComponent } from './add-chemical/add-chemical.component';
import { EditChemicalComponent } from './edit-chemical/edit-chemical.component';

const routes: Routes = [
  {
    path: '',
    component: ChemicalManagementComponent,
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: 'all', component: AllChemicalsComponent },
      { path: 'add', component: AddChemicalComponent },
      { path: ':chemical_id', component: DetailChemicalComponent },
      { path: ':chemical_id/edit', component: EditChemicalComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChemicalManagementRoutingModule {}
