import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { ErrorStateMatcher } from '@angular/material/core';
import { ErrorStateMatcher } from '@angular/material/core';
@Component({
  selector: 'pelaguru-seller-request',
  templateUrl: './seller-request.component.html',
  styleUrls: ['./seller-request.component.scss'],
})
export class SellerRequestComponent implements OnInit {
  @Input() viewState: string;
  formControl: FormGroup;
  matcher: ErrorStateMatcher;
  title = 'dropzone';
  uploadedURL = '';
  files: File[] = [];
  constructor(private authService: AuthService, private router: Router) {
    this.formControl = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telephone: new FormControl('', [Validators.required]),
      shopName: new FormControl('', [Validators.required]),
      option: new FormControl('', [Validators.required]),
      acceptfile: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
    this.matcher = new ErrorStateMatcher();
  }

  ngOnInit(): void {}
  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }
  get userData() {
    return this.authService.userData;
  }
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
