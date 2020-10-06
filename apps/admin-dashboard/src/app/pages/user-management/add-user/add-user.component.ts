import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { NotificationService } from '../../../core/notification-service/notification.service';
import { UserService } from '../../../core/user-service/user.service';
import { AuthErrorCodes } from '@pelaguru/error-codes';
import { NbComponentStatus } from '@nebular/theme';

@Component({
  selector: 'pelaguru-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  formControl: FormGroup;
  loading: boolean;
  constructor(
    private notificationService: NotificationService,
    private userService: UserService
  ) {
    this.formControl = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  async addUser() {
    if (this.formControl.valid) {
      this.loading = true;
      switch (this.formControl.get('role').value) {
        case '1':
          this.addAdmin();
          break;
        case '2':
          this.addResourcePerson();
          break;
        case '3':
          this.addModerator();
          break;
      }
    }
  }

  addAdmin() {
    this.userService
      .addAdmin(
        `${this.formControl.get('firstName').value} ${
          this.formControl.get('lastName').value
        }`,
        this.formControl.get('email').value,
        this.formControl.get('password').value
      )
      .then((response) => {
        this.loading = false;
        if (response.success) {
          this.formControl.reset();
          this.notificationService.create(
            'User successfully added.',
            'success',
            'Success'
          );
        } else {
          switch (response.errorCode) {
            case AuthErrorCodes.EmailAlreadyExists:
              this.notificationService.create(
                'User already exist.',
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
      })
      .catch((error) => {
        this.loading = false;
      });
  }

  addModerator() {
    this.userService
      .addModerator(
        `${this.formControl.get('firstName').value} ${
          this.formControl.get('lastName').value
        }`,
        this.formControl.get('email').value,
        this.formControl.get('password').value
      )
      .then((response) => {
        this.loading = false;
        if (response.success) {
          this.formControl.reset();
          this.notificationService.create(
            'User successfully added.',
            'success',
            'Success'
          );
        } else {
          switch (response.errorCode) {
            case AuthErrorCodes.EmailAlreadyExists:
              this.notificationService.create(
                'User already exist.',
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
      })
      .catch((error) => {
        this.loading = false;
      });
  }

  addResourcePerson() {
    this.userService
      .addResourcePerson(
        `${this.formControl.get('firstName').value} ${
          this.formControl.get('lastName').value
        }`,
        this.formControl.get('email').value,
        this.formControl.get('password').value
      )
      .then((response) => {
        this.loading = false;
        if (response.success) {
          this.formControl.reset();
          this.notificationService.create(
            'User successfully added.',
            'success',
            'Success'
          );
        } else {
          switch (response.errorCode) {
            case AuthErrorCodes.EmailAlreadyExists:
              this.notificationService.create(
                'User already exist.',
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
      })
      .catch((error) => {
        this.loading = false;
      });
  }
}
