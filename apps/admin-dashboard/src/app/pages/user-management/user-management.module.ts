import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { AddUserComponent } from './add-user/add-user.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { UserManagementComponent } from './user-management.component';
import { DetailsUserComponent } from './details-user/details-user.component';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [
    AddUserComponent,
    AllUsersComponent,
    UserManagementComponent,
    DetailsUserComponent,
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    SharedModule,
    CoreModule,
  ],
})
export class UserManagementModule {}
