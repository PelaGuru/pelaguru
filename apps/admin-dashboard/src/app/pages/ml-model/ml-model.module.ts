import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MlModelRoutingModule } from './ml-model-routing.module';
import { MlModelComponent } from './ml-model.component';
import { LabelImagesComponent } from './label-images/label-images.component';

@NgModule({
  declarations: [MlModelComponent, LabelImagesComponent],
  imports: [CommonModule, MlModelRoutingModule],
})
export class MlModelModule {}
