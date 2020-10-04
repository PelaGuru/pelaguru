import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MlModelComponent } from './ml-model.component';
import { LabelImagesComponent } from './label-images/label-images.component';

const routes: Routes = [
  {
    path: '',
    component: MlModelComponent,
    children: [{ path: 'label-images', component: LabelImagesComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MlModelRoutingModule {}
