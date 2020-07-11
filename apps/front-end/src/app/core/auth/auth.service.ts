import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { first, map } from 'rxjs/operators';
import { auth } from 'firebase/app';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { User, NormalUserRole, ServiceResponse } from '@pelaguru/interfaces';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private firebaseAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router
  ) {
    this.firebaseAuth.authState.pipe(map(async u => !!u)).subscribe(async u => {
      AuthService.isUserAuthenticated.next(await u);
    });

    this.firebaseAuth.onAuthStateChanged(async u => {
      if (!!u) {
        const afsUserRef: AngularFirestoreDocument<User> = this.fireStore.doc(
          `users/${u.uid}`
        );
        const user = await afsUserRef.get().toPromise();
        if (user.exists) {
          AuthService.userObservable.next(user.data() as User);
        } else {
          AuthService.userObservable.next(null);
        }
      } else {
        AuthService.userObservable.next(null);
      }
    });
  }

  private static isUserAuthenticated: BehaviorSubject<
    boolean
  > = new BehaviorSubject<boolean>(false);
  private static userObservable = new BehaviorSubject<User>(null);

  isAuthenticated(): Observable<boolean> {
    return AuthService.isUserAuthenticated.asObservable();
  }

  isVendor() {
    return AuthService.userObservable.pipe(
      map(user => user?.role === NormalUserRole.vendor)
    );
  }

  isNormalUser() {
    return AuthService.userObservable.pipe(
      map(user => user?.role === NormalUserRole.normalUser)
    );
  }

  logout() {
    return from(this.firebaseAuth.signOut());
  }

  async signInWithEmailPassword(
    email: string,
    password: string
  ): Promise<ServiceResponse> {
    return new Promise<ServiceResponse>(async _resolve => {
      try {
        const credentials = await this.firebaseAuth.signInWithEmailAndPassword(
          email,
          password
        );
        _resolve(new ServiceResponse(true, 'SUCCESS', null, credentials.user));
      } catch (error) {
        _resolve(new ServiceResponse(false, 'FIREAUTH_ERROR', error, null));
      }
    });
  }

  async signUpWithEmailPassword(
    displayName: string,
    email: string,
    password: string
  ): Promise<ServiceResponse> {
    return new Promise<ServiceResponse>(async _resolve => {
      try {
        const credentials = await this.firebaseAuth.createUserWithEmailAndPassword(
          email,
          password
        );
        const createUserResponse = await this.createUser({
          uid: credentials.user.uid,
          displayName: displayName,
          email: credentials.user.email,
          emailVerified: false,
          photoURL: 'https://pelaguru-dev.web.app/assets/img/temp/temp-user.svg'
        });
        _resolve(createUserResponse);
      } catch (error) {
        _resolve(new ServiceResponse(false, 'FIREAUTH_ERROR', error, null));
      }
    });
  }

  async loginWithGoogle() {
    return new Promise<ServiceResponse>(async _resolve => {
      try {
        const provider = new auth.GoogleAuthProvider();
        const credentials = await this.firebaseAuth.signInWithPopup(provider);
        this.updateUser(credentials.user);
        _resolve(new ServiceResponse(true, 'SUCCESS', null, null));
      } catch (error) {
        _resolve(new ServiceResponse(false, 'FIREAUTH_ERROR', error, null));
      }
    });
  }

  private async updateUser({
    uid,
    displayName,
    email,
    photoURL,
    emailVerified
  }) {
    const afsUserRef: AngularFirestoreDocument<User> = this.fireStore.doc(
      `users/${uid}`
    );

    const user = await afsUserRef.get().toPromise();

    if (!user.exists) {
      const userData: User = {
        displayName,
        email,
        profilePic: photoURL,
        role: NormalUserRole.normalUser
      };

      afsUserRef.set(userData, { merge: true });
    } else {
      const userData: User = {
        displayName,
        email,
        profilePic: photoURL
      };

      afsUserRef.set(userData, { merge: true });
    }
    this.router.navigate(['/']);
  }

  private async createUser({
    uid,
    displayName,
    email,
    photoURL,
    emailVerified
  }) {
    return new Promise<ServiceResponse>(async _resolve => {
      try {
        const afsUserRef: AngularFirestoreDocument<User> = this.fireStore.doc(
          `users/${uid}`
        );
        const user = await afsUserRef.get().toPromise();
        if (!user.exists) {
          const userData: User = {
            displayName,
            email,
            profilePic: photoURL,
            role: NormalUserRole.normalUser
          };
          const result = await afsUserRef.set(userData, { merge: true });
          _resolve(new ServiceResponse(true, 'USER_ADDED_TO_DB', null, null));
        } else {
          _resolve(new ServiceResponse(false, 'USER_EXIST', null, null));
        }
      } catch (error) {
        _resolve(new ServiceResponse(false, 'FRIRESTORE_ERROR', error, null));
      }
    });
  }

  get userData(): Observable<User> {
    return AuthService.userObservable;
  }
}
