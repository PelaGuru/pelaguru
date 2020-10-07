import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../core/auth/auth.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NotoficationReplyDialogComponent } from '../notofication-reply-dialog/notofication-reply-dialog.component';

@Component({
  selector: 'pelaguru-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
  msgs = [];
  myId = '';
  @Input() title: string;
  @Input() isClearNotification: Observable<boolean>;
  constructor(
    private router: Router,
    private fireStore: AngularFirestore,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  async ngOnInit() {
    this.authService.getUserStream().subscribe(async (resopnse) => {
      // console.log(Response);
      this.myId = resopnse.userId;
      console.log(this.myId);
      try {
        const ref = this.fireStore.firestore.collection('contactMessages');
        const snapshot = await ref.where('to_id', '==', this.myId).get();
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }
        snapshot.forEach((doc) => {
          // console.log(doc.id, '=>', doc.data());
          this.msgs.push({
            msg: doc.data()['message'],
            shopId: doc.data()['from_id'],
          });
        });
      } catch (error) {
        console.log(error);
      }
    });

    // console.log(this.router.url.split('/')[2]);
    // this.fireStore.firestore
    //   .collection('contactMessages')
    //   .where('to_id', '==', this.myId)
    //   .onSnapshot((querySnapshot) => {
    //     console.log(`Received query snapshot of size ${querySnapshot.size}`);
    //     console.log(querySnapshot);
    //     this.msgs = [];
    //     querySnapshot.forEach((change) => {
    //       console.log(change);
    //       this.msgs.push(change);
    //     });
    //   });
    this.isClearNotification.subscribe((response) => {
      this.msgs = [];
    });
  }

  reply(shopId: string) {
    const dialogRef = this.dialog.open(NotoficationReplyDialogComponent, {
      data: { shopId },
      width: '50vw',
      disableClose: true,
    });
    console.log('hello');
  }
}
