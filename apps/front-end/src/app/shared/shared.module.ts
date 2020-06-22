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

import { NotFoundComponent } from './not-found/not-found.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { NavDrawerComponent } from './nav-drawer/nav-drawer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RightDrawerComponent } from './right-drawer/right-drawer.component';
import { FooterComponent } from './footer/footer.component';

const nativeModules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule
];

const externalModules = [
  MatSidenavModule,
  MatButtonModule,
  MatRippleModule,
  MatIconModule,
  MatBadgeModule,
  MatAutocompleteModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatCardModule
];

@NgModule({
  declarations: [
    NotFoundComponent,
    NotAuthorizedComponent,
    NavDrawerComponent,
    NavBarComponent,
    RightDrawerComponent,
    FooterComponent
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
    FooterComponent
  ]
})
export class SharedModule {}
