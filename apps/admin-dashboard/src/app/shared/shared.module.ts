import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
  NbSelectModule,
  NbBadgeModule,
  NbSpinnerModule,
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { MatTableModule } from '@angular/material/table';
import { NgxDropzoneModule } from 'ngx-dropzone';

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
  NbSelectModule,
  MatTableModule,
  NbBadgeModule,
  NbSpinnerModule,
  NgxDropzoneModule,
];

@NgModule({
  declarations: [NotAuthorizedComponent, NotFoundComponent],
  imports: [CommonModule, ...nativeModules, ...externalModules],
  exports: [...nativeModules, ...externalModules],
})
export class SharedModule {}
