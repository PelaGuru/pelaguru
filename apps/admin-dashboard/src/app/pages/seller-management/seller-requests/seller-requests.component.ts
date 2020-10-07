import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  FirestoreOperation,
  SellerRequest,
  SellerRequestStatus,
  Shop,
} from '@pelaguru/interfaces';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase/app';
import { NotificationService } from '../../../core/notification-service/notification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'pelaguru-seller-requests',
  templateUrl: './seller-requests.component.html',
  styleUrls: ['./seller-requests.component.scss'],
})
export class SellerRequestsComponent implements OnInit {
  loading = true;
  requests: BehaviorSubject<Partial<SellerRequest>[]> = new BehaviorSubject([]);
  displayedColumns: string[] = [
    'name',
    'email',
    'shop_name',
    'requested_at',
    'action',
  ];
  constructor(
    private fireStore: AngularFirestore,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getSellerRequests();
  }

  async getSellerRequests() {
    this.loading = true;
    const ref = this.fireStore.firestore
      .collectionGroup('SellerRequest')
      .where('status', '==', SellerRequestStatus.Pending);
    const data = await ref.get();
    if (data) {
      this.loading = false;
    }
    if (!data.empty) {
      this.requests.next(
        data.docs.map((d) => {
          return d.data() as SellerRequest;
        })
      );
    }
  }

  convertDate(timestamp: number) {
    return ((timestamp as unknown) as firebase.firestore.Timestamp)
      .toDate()
      .toLocaleDateString();
  }

  async acceptSellerRequests(userId: string, requesId: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you realy want to accept?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No',
    }).then(async (result) => {
      if (result.value) {
        try {
          const ref = this.fireStore
            .collection('Users')
            .doc(userId)
            .collection('SellerRequest')
            .doc(requesId);
          const data = (await ref.get().toPromise()).data() as SellerRequest;
          const id = this.fireStore.createId();
          const addDataRef = this.fireStore.collection('Shops').doc(id);
          const addData: FirestoreOperation<Shop> = {
            address: data.address,
            approved: true,
            closed: false,
            contactNumber: data.contactNumber,
            description: data.description,
            email: data.email,
            image: '',
            name: data.shopName,
            vendorId: data.userId,
            id,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          };
          await ref.set(
            { status: SellerRequestStatus.Approved },
            { merge: true }
          );
          await addDataRef.set(addData);
          this.notificationService.create(
            'Seller request successfully approved.',
            'success',
            'Success'
          );
        } catch (error) {
          this.notificationService.create(
            'Something went wrong. Try again later.',
            'danger',
            'Error'
          );
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
      }
    });
  }
}
