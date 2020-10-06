import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { User } from '@pelaguru/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private firebaseAuth: AngularFireAuth,
    private fireStore: AngularFirestore
  ) {}

  async updateUserProfile(
    uid: string,
    displayName: string,
    photoURL: string,
    firstName: string,
    lastName: string,
    address: string,
    telephone: string,
  ) {
    const afsUserRef: AngularFirestoreDocument<User> = this.fireStore.doc(
      `Users/${uid}`
    );
    const userData: Partial<User> = {
      displayName,
      firstName,
      lastName: lastName,
      address: address,
      telephone: telephone,
    };
    await afsUserRef.update(userData as User);
  }

  async getProfileData(id: string): Promise<User> {
    const afsUserRef: AngularFirestoreDocument<User> = this.fireStore.doc(
      `Users/${id}`
    );
    const data = await afsUserRef.get().toPromise();
    return data.data() as User;
  }
}
