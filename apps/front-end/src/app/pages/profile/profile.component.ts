import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { ProfileService } from '../../core/profile-service/profile.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '@pelaguru/interfaces';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'pelaguru-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() viewState: string;
  formControl: FormGroup;
  matcher: ErrorStateMatcher;
  userData: BehaviorSubject<Partial<User>> = new BehaviorSubject(null);
  constructor(
    private authService: AuthService,
    private router: Router,
    private profileServiceService: ProfileService
  ) {
    this.formControl = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      address: new FormControl(''),
      email: new FormControl({ value: '', readonly: true }, [
        Validators.required,
        Validators.email,
      ]),
      telephone: new FormControl(''),
    });
    this.matcher = new ErrorStateMatcher();
  }

  ngOnInit() {
    // this.getUserId();
    this.authService.getUserStream().subscribe(async (profile) => {
      this.getProfileData(profile.userId);
    });
  }

  updateUserProfile() {
    this.profileServiceService
      .updateUserProfile(
        this.userData.value.userId,
        `${this.formControl.get('firstName').value} ${
          this.formControl.get('firstName').value
        }`,
        '',
        this.formControl.get('firstName').value,
        this.formControl.get('lastName').value,
        this.formControl.get('address').value,
        this.formControl.get('telephone').value
      )
      .then(() => {
        this.getProfileData(this.userData.value.userId);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async getProfileData(userId: string) {
    const data = await this.profileServiceService.getProfileData(userId);
    this.formControl.setValue({
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      address: data.address || '',
      email: data.email || '',
      telephone: data.telephone || '',
    });

    this.userData.next(data);
  }
}
