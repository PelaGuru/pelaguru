import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiseasesComponent } from './diseases.component';
import { DiseasesCatalogueComponent } from './diseases-catalogue/diseases-catalogue.component';
import { ViewDiseaseComponent } from './view-disease/view-disease.component';
import {ShopItemComponent} from '../marketplace/view-shop/shop-item/shop-item.component';

const routes: Routes = [
  {
    path: '',
    component: DiseasesComponent,
    children: [
      { path: '', component: DiseasesCatalogueComponent },
      { path: ':plantUsername', component: ViewDiseaseComponent },
      // { path: ':itemId', component: ShopItemComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiseasesRoutingModule {}
