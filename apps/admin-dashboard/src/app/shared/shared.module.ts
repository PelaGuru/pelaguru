import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbLayoutModule,
  NbAlertModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbMenuModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { RouterModule } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';

const nativeModules = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
];

const externalModules = [
  NbLayoutModule,
  NbEvaIconsModule,
  NbAlertModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbMenuModule,
];

@NgModule({
  declarations: [NotAuthorizedComponent, NotFoundComponent],
  imports: [CommonModule, ...nativeModules, ...externalModules],
  exports: [...nativeModules, ...externalModules],
})
export class SharedModule {}
