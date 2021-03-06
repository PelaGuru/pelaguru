import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../../../../app/core/auth/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';

@Component({
  selector: 'pelaguru-shop-message-dialog',
  templateUrl: './shop-message-dialog.component.html',
  styleUrls: ['./shop-message-dialog.component.scss'],
})
export class ShopMessageDialogComponent implements OnInit {
  formControl: FormGroup;
  to_id: string;
  from_id: string;
  msg: string;
  constructor(
    public dialogRef: MatDialogRef<ShopMessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { shopId: string },
    private authService: AuthService,
    private router: Router,
    private fireStore: AngularFirestore
  ) {
    this.formControl = new FormGroup({
      message: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  async sendMessage() {
    this.authService.getUserStream().subscribe((resopnse) => {
      // console.log(Response);
      this.from_id = resopnse.userId;
      this.to_id = this.router.url.split('/')[2];

      this.writeUserData();
    });
  }

  async writeUserData() {
    this.fireStore
      .collection('contactMessages')
      .add({
        to_id: this.to_id,
        from_id: this.from_id,
        message: this.formControl.get('message').value,
        timestamp: new Date(),
      })
      .then(() => {
        Swal.fire({
          title: 'We got you !',
          icon: 'success',
          cancelButtonText: 'No',
        });
        this.dialogRef.close();
      });
  }
}
