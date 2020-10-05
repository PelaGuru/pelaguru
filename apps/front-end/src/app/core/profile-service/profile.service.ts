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
    email: string,
    lastName: string,
    address: string,
    telephone: string,
    description: string
  ) {
    const afsUserRef: AngularFirestoreDocument<User> = this.fireStore.doc(
      `Users/${uid}`
    );
    const userData: Partial<User> = {
      displayName,
      firstName: firstName,
      lastName: lastName,
      address: address,
      telephone: telephone,
      description: description,
    } as User;
    await afsUserRef.set(userData as User, { merge: true });
  }

  async getProfileData(id: string): Promise<User> {
    const afsUserRef: AngularFirestoreDocument<User> = this.fireStore.doc(
      `Users/${id}`
    );
    const data = await afsUserRef.get().toPromise();
    return data.data() as User;
  }
}
