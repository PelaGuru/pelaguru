import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiseasesIdentifierRoutingModule } from './diseases-identifier-routing.module';
import { DiseasesIdentifierComponent } from './diseases-identifier.component';

@NgModule({
  declarations: [DiseasesIdentifierComponent],
  imports: [CommonModule, DiseasesIdentifierRoutingModule]
})
export class DiseasesIdentifierModule {}
