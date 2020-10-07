import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'pelaguru-notofication-reply-dialog',
  templateUrl: './notofication-reply-dialog.component.html',
  styleUrls: ['./notofication-reply-dialog.component.scss'],
})
export class NotoficationReplyDialogComponent implements OnInit {
  formControl: FormGroup;
  from_id = '';
  to_id = '';
  constructor(
    public dialogRef: MatDialogRef<NotoficationReplyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { shopId: string },
    private authService: AuthService,
    private router: Router,
    private fireStore: AngularFirestore
  ) {
    this.formControl = new FormGroup({
      message: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  async sendMessage() {
    this.authService.getUserStream().subscribe((resopnse) => {
      // console.log(Response);
      this.from_id = resopnse.userId;
      // this.to_id = this.router.url.split('/')[2];

      this.writeUserData();
    });
  }

  async writeUserData() {
    this.fireStore
      .collection('contactMessages')
      .add({
        to_id: this.data.shopId,
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

  //   sendMessage() {
  //     let msg = ''
  //     console.log('send');
  //     console.log(msg = this.formControl.get('message').value);

  //     this.authService.getUserStream().subscribe(async (resopnse) => {
  //       // console.log(Response);
  //       this.myId = resopnse.userId;
  //       console.log(this.myId);
  //       try {

  //       } catch (error) {
  //         console.log(error);
  //       }

  //   }
  // }
}
