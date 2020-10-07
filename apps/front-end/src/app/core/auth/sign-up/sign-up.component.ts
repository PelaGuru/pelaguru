import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthErrorCodes } from '@pelaguru/error-codes';
import Swal from 'sweetalert2';

@Component({
  selector: 'pelaguru-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  formController: FormGroup;
  matcher: ErrorStateMatcher;
  isLoading: boolean;
  constructor(
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
    this.formController = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    this.matcher = new ErrorStateMatcher();
  }

  ngOnInit(): void {}

  async signUp(): Promise<void> {
    if (this.formController.valid) {
      this.isLoading = true;
      const signUpResponse = await this.authService.signUpWithEmailPassword(
        `${this.formController.get('firstName').value} ${
          this.formController.get('lastName').value
        }`,
        this.formController.get('email').value,
        this.formController.get('password').value
      );

      if (signUpResponse.success) {
        this.isLoading = false;
        Swal.fire({
          title: 'Welcome to our app !',
          icon: 'success',
          cancelButtonText: 'No',
        });
        this.router.navigate(['/']);
      } else {
        this.isLoading = false;
        switch (signUpResponse.errorCode) {
          case AuthErrorCodes.EmailAlreadyExists:
            this.snackbar.open(
              'Your are already created a account. Please try to Sign In.',
              'close'
            );
            break;
          case AuthErrorCodes.InvalidArgument:
            this.snackbar.open(
              'Please input all fields and try again.',
              'close'
            );
            break;
          default:
            this.snackbar.open(
              'Something went wrong. Try again later.',
              'close'
            );
            break;
        }
      }
    }
  }
}
