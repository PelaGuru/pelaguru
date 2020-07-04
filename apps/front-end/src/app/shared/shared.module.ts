import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { NavDrawerComponent } from './nav-drawer/nav-drawer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RightDrawerComponent } from './right-drawer/right-drawer.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

const nativeModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule
];

const externalModules = [
  NgApexchartsModule,
  MatSidenavModule,
  MatButtonModule,
  MatRippleModule,
  MatIconModule,
  MatBadgeModule,
  MatAutocompleteModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatCardModule,
  MatListModule,
  MatPaginatorModule,
  MatTableModule,
  MatSortModule,
  MatStepperModule,
  NgxDropzoneModule
];

@NgModule({
  declarations: [
    NotFoundComponent,
    NotAuthorizedComponent,
    NavDrawerComponent,
    NavBarComponent,
    RightDrawerComponent,
    FooterComponent,
    BreadcrumbComponent
  ],
  imports: [CommonModule, ...nativeModules, ...externalModules],
  exports: [
    ...nativeModules,
    ...externalModules,
    NotFoundComponent,
    NotAuthorizedComponent,
    NavDrawerComponent,
    NavBarComponent,
    RightDrawerComponent,
    FooterComponent,
    BreadcrumbComponent
  ]
})
export class SharedModule {}
