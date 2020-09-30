import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'pelaguru-account-recovery-request',
  templateUrl: './account-recovery-request.component.html',
  styleUrls: ['./account-recovery-request.component.scss'],
})
export class AccountRecoveryRequestComponent implements OnInit {
  formControl: FormGroup;
  submitted: boolean;

  constructor() {
    this.formControl = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit(): void {}

  requestPasswordReset(): void {}
}
