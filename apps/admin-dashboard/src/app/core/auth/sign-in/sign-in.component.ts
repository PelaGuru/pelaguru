import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../notification-service/notification.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'pelaguru-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  formController: FormGroup;
  submitted: boolean;
  isLoading: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.formController = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  async login(): Promise<void> {
    if (this.formController.valid) {
      this.isLoading = true;
      const response = await this.authService.signInWithEmailPassword(
        this.formController.get('email').value,
        this.formController.get('password').value
      );
      if (response.success) {
        this.isLoading = false;
        this.router.navigate(['/']);
      } else {
        this.isLoading = false;
        switch (response.errorCode) {
          case 'auth/user-not-found':
            this.notificationService.create(
              'Your are not created a account. Please try to Sign Up.',
              'danger',
              'Error'
            );
            break;
          case 'auth/wrong-password':
            this.notificationService.create(
              'Your email or password is incorrect.',
              'danger',
              'Error'
            );
            break;
          default:
            this.notificationService.create(
              'Something went wrong. Try again later.',
              'danger',
              'Error'
            );
            break;
        }
      }
    }
  }
}
