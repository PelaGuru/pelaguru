import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiseasesIdentifierComponent } from '../diseases-identifier/diseases-identifier.component';

const routes: Routes = [{ path: '', component: DiseasesIdentifierComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiseasesIdentifierRoutingModule {}
