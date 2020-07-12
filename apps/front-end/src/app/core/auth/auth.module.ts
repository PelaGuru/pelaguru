import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SharedModule } from '../../shared/shared.module';
import { AuthNavBarComponent } from './auth-nav-bar/auth-nav-bar.component';
import { GoogleSignInComponent } from './google-sign-in/google-sign-in.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    AuthNavBarComponent,
    GoogleSignInComponent,
    ForgotPasswordComponent
  ],
  imports: [CommonModule, SharedModule],
  providers: [AuthService, AuthGuard]
})
export class AuthModule {}
