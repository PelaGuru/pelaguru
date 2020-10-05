import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

import { DiseasesIdentifierRoutingModule } from './diseases-identifier-routing.module';
import { DiseasesIdentifierComponent } from './diseases-identifier.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [DiseasesIdentifierComponent],
  imports: [
    CommonModule,
    DiseasesIdentifierRoutingModule,
    SharedModule,
    NgxSpinnerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DiseasesIdentifierModule {}
