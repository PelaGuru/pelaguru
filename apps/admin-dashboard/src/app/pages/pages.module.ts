import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [PagesComponent],
  imports: [CommonModule, PagesRoutingModule, CoreModule],
})
export class PagesModule {}
