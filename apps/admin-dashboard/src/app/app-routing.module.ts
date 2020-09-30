import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './core/auth/sign-in/sign-in.component';
import { AccountRecoveryRequestComponent } from './core/auth/account-recovery-request/account-recovery-request.component';
import { ResetPasswordComponent } from './core/auth/reset-password/reset-password.component';

const routes: Routes = [
  { path: 'sign-in', component: SignInComponent /*canActivate: [AuthGuard]*/ },
  {
    path: 'account-recovery-request',
    component: AccountRecoveryRequestComponent,
  },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: '',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
