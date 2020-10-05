import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { AccountRecoveryRequestComponent } from './account-recovery-request/account-recovery-request.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SharedModule } from '../../shared/shared.module';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    SignInComponent,
    AccountRecoveryRequestComponent,
    ResetPasswordComponent,
  ],
  imports: [CommonModule, SharedModule],
  providers: [AuthService],
})
export class AuthModule {}
