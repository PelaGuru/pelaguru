import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'pelaguru-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  formController: FormGroup;
  matcher: ErrorStateMatcher;

  constructor(
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
    this.formController = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
    this.matcher = new ErrorStateMatcher();
  }

  ngOnInit(): void {}

  async signIn() {
    if (this.formController.valid) {
      const response = await this.authService.signInWithEmailPassword(
        this.formController.get('email').value,
        this.formController.get('password').value
      );
      if (response.success) {
        this.router.navigate(['/']);
      } else {
        if (response.message === 'FIREAUTH_ERROR') {
          if (response.error.code === 'auth/user-not-found') {
            this.snackbar.open(
              'Your are not created a account. Please try to Sign Up.',
              'close'
            );
          } else {
            this.snackbar.open(
              'Something went wrong. Try again later.',
              'close'
            );
          }
        } else {
          this.snackbar.open('Something went wrong. Try again later.', 'close');
        }
      }
    }
  }
}
