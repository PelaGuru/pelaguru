import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiseasManagementComponent } from './diseas-management.component';
import { EditDiseasComponent } from './edit-diseas/edit-diseas.component';
import { AddDiseasComponent } from './add-diseas/add-diseas.component';
import { AllDiseasesComponent } from './all-diseases/all-diseases.component';
import { DetailDiseasComponent } from './detail-diseas/detail-diseas.component';

const routes: Routes = [
  {
    path: '',
    component: DiseasManagementComponent,
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: 'all', component: AllDiseasesComponent },
      { path: 'add', component: AddDiseasComponent },
      { path: ':diseas_id', component: DetailDiseasComponent },
      { path: ':diseas_id/edit', component: EditDiseasComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiseasManagementRoutingModule {}
