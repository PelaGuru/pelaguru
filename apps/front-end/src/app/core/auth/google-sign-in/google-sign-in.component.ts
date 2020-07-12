import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'pelaguru-google-sign-in',
  templateUrl: './google-sign-in.component.html',
  styleUrls: ['./google-sign-in.component.scss']
})
export class GoogleSignInComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  async signIn(): Promise<void> {
    const response = await this.authService.loginWithGoogle();
    if (!response.success) {
      this.snackbar.open('Something went wrong. Try again later.', 'close');
    }
  }
}
