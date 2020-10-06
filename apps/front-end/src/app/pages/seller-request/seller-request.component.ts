import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { ErrorStateMatcher } from '@angular/material/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { BehaviorSubject } from 'rxjs';
import { SellerRequest, SellerRequestStatus, User } from '@pelaguru/interfaces';
import { ProfileService } from '../../core/profile-service/profile.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VendorService } from '../../core/vendor-service/vendor.service';

@Component({
  selector: 'pelaguru-seller-request',
  templateUrl: './seller-request.component.html',
  styleUrls: ['./seller-request.component.scss'],
})
export class SellerRequestComponent implements OnInit {
  requestId: string;
  requestAlreadySent = true;
  isLoading = true;
  isPending: boolean;
  isRejected: boolean;
  @Input() viewState: string;
  formControl: FormGroup;
  matcher: ErrorStateMatcher;
  title = 'dropzone';
  uploadedURL = '';
  files: File[] = [];
  userData: BehaviorSubject<User> = new BehaviorSubject(null);
  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private snackbar: MatSnackBar,
    private vendorService: VendorService,
    private router: Router
  ) {
    this.formControl = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telephone: new FormControl('', [Validators.required]),
      shopName: new FormControl('', [Validators.required]),
      option: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
    this.matcher = new ErrorStateMatcher();
  }

  ngOnInit(): void {
    this.getUserData();
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  getUserData() {
    this.authService.getUserStream().subscribe(async (profile) => {
      this.getProfileData(profile.userId);
      this.checkSellerStatus(profile.userId);
    });
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  async getProfileData(userId: string) {
    const data = await this.profileService.getProfileData(userId);
    this.userData.next(data);
    this.formControl.setValue({
      firstName: data.displayName || '',
      lastName: data.lastName || '',
      address: data.address || '',
      email: data.email || '',
      telephone: data.telephone || '',
      shopName: '',
      option: '',
      description: '',
    });
  }

  submitSellerRequest() {
    if (this.formControl.valid) {
      if (this.files.length < 1) {
        this.snackbar.open('Document cannot be empty.', 'close');
      } else {
        this.isLoading = true;
        this.vendorService
          .uploadDocument(this.files[0], this.userData.value.userId)
          .then((response) => {
            this.vendorService
              .makeSellerRequest(
                this.userData.value.userId,
                this.formControl.get('firstName').value,
                this.formControl.get('lastName').value,
                this.formControl.get('address').value,
                this.formControl.get('email').value,
                this.formControl.get('telephone').value,
                response,
                this.formControl.get('option').value,
                this.formControl.get('shopName').value,
                this.formControl.get('description').value
              )
              .then(() => {
                this.isLoading = false;
                this.requestAlreadySent = true;
                this.checkSellerStatus(this.userData.value.userId);
                this.snackbar.open('Your request successfully sent.', 'close');
              })
              .catch((error) => {
                this.isLoading = false;
                this.snackbar.open(
                  'Something went wrong. Try again later.',
                  'close'
                );
              });
          });
      }
    } else {
      this.snackbar.open('Please fill the request form correctly.', 'close');
    }
  }

  checkSellerStatus(id: string) {
    this.vendorService
      .checkSellerRequest(id)
      .then((response) => {
        console.log(response);
        this.requestId = (response as SellerRequest).id;
        this.isLoading = false;
        if (!response) {
          this.requestAlreadySent = false;
        } else {
          if (response.status === SellerRequestStatus.Pending) {
            this.isPending = true;
          } else if (response.status === SellerRequestStatus.Rejected) {
            this.isRejected = true;
          }
        }
      })
      .catch((error) => {
        this.isLoading = false;
      });
  }

  async deleteRequest() {
    this.isLoading = true;
    console.log(this.userData.value.userId, this.requestId);

    this.vendorService
      .deletedRequest(this.userData.value.userId, this.requestId)
      .then(() => {
        this.isLoading = false;
        this.isRejected = false;
        this.isPending = false;
        this.checkSellerStatus(this.userData.value.userId);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
