import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'pelaguru-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  formController: FormGroup;
  matcher: ErrorStateMatcher;
  isLoading: boolean;
  constructor(
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {
    this.formController = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
    this.matcher = new ErrorStateMatcher();
  }

  ngOnInit(): void {}

  async signIn() {
    if (this.formController.valid) {
      this.isLoading = true;
      const response = await this.authService.signInWithEmailPassword(
        this.formController.get('email').value,
        this.formController.get('password').value
      );
      if (response.success) {
        this.isLoading = false;
        this.router.navigate(['/']);
        Swal.fire({
          title: 'Nice to see you again !',
          text: 'Log in successful',
          icon: 'success',
          cancelButtonText: 'No',
        });
      } else {
        this.isLoading = false;
        switch (response.errorCode) {
          case 'auth/user-not-found':
            this.snackbar.open(
              'Your are not created a account. Please try to Sign Up.',
              'close'
            );
            break;
          case 'auth/wrong-password':
            this.snackbar.open('Your email or password is incorrect.', 'close');
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
