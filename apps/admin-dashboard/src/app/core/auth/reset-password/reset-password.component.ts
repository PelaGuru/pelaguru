import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

const confirmPasswordValidator: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  return control.get('password').value === control.get('cpassword').value
    ? null
    : { confirmPasswordNotMatched: true };
};

@Component({
  selector: 'pelaguru-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  isPasswordShow: boolean;
  formControl: FormGroup;
  submitted: boolean;

  constructor() {
    this.formControl = new FormGroup(
      {
        password: new FormControl('', Validators.required),
        cpassword: new FormControl('', Validators.required),
      },
      { validators: confirmPasswordValidator }
    );
  }

  ngOnInit(): void {}

  resetPassword(): void {}
}
