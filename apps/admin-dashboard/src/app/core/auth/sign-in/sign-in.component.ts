import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'pelaguru-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  formControl: FormGroup;
  submitted: boolean;
  constructor(private authService: AuthService) {
    this.formControl = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  login(): void {
    if (this.formControl.valid) {
      this.authService.signInWithEmailPassword(
        this.formControl.get('email').value,
        this.formControl.get('password').value
      );
    }
  }
}
