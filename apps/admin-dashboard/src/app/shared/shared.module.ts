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
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { RouterModule } from '@angular/router';

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
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...nativeModules, ...externalModules],
  exports: [...nativeModules, ...externalModules],
})
export class SharedModule {}
