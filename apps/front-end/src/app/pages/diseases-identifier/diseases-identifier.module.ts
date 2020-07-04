import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiseasesIdentifierRoutingModule } from './diseases-identifier-routing.module';
import { DiseasesIdentifierComponent } from './diseases-identifier.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [DiseasesIdentifierComponent],
  imports: [CommonModule, DiseasesIdentifierRoutingModule, SharedModule]
})
export class DiseasesIdentifierModule {}
