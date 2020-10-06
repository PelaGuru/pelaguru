import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import {
  FirestoreOperation,
  SellerRequest,
  SellerRequestStatus,
} from '@pelaguru/interfaces';
import * as firebase from 'firebase/app';
import { forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  private readonly DOCUMENT_BASE_PATH = 'sellerdocuments';
  constructor(
    private fireStore: AngularFirestore,
    private fireStorage: AngularFireStorage
  ) {}

  async makeSellerRequest(
    userId: string,
    firstName: string,
    lastName: string,
    address: string,
    email: string,
    contactNumber: string,
    document: string,
    documentType: string,
    shopName: string,
    description: string
  ) {
    const id = this.fireStore.createId();
    const ref = this.fireStore
      .doc(`Users/${userId}/`)
      .collection('SellerRequest')
      .doc(id);
    const data: FirestoreOperation<SellerRequest> = {
      id,
      userId,
      firstName,
      lastName,
      address,
      email,
      contactNumber,
      documentUrl: document,
      documentType,
      shopName,
      description,
      status: SellerRequestStatus.Pending,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    return await ref.set(data);
  }

  async uploadDocument(file: File, userId: string) {
    const baseFilePath = `${this.DOCUMENT_BASE_PATH}/${userId}/`;
    // return await Promise.all(uploadEvents);
    const filePath = `${baseFilePath}/${new Date().getTime()}_${file.name}`;
    const fileRef = this.fireStorage.ref(filePath);
    const task = this.fireStorage.upload(filePath, file);
    // tslint:disable-next-line: deprecation
    const url = await forkJoin(task.snapshotChanges())
      .pipe(
        mergeMap(() => fileRef.getDownloadURL()),
        // tslint:disable-next-line: no-shadowed-variable
        map((url) => url as string)
      )
      .toPromise();
    return url;
  }

  async checkSellerRequest(id: string) {
    const ref = this.fireStore
      .collection('Users')
      .doc(id)
      .collection('SellerRequest');
    const data = await ref.get().toPromise();
    if (data.empty) {
      return false;
    } else {
      return data.docs[0].data() as SellerRequest;
    }
  }

  async deletedRequest(id: string, docId: string) {
    const ref = this.fireStore
      .collection('Users')
      .doc(id)
      .collection('SellerRequest')
      .doc(docId);
    await ref.delete();
  }
}
