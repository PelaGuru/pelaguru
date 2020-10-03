import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, first, switchMap } from 'rxjs/operators';
import { auth } from 'firebase/app';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import {
  User,
  UserRole,
  ServiceResponse,
  ServerResponse,
} from '@pelaguru/interfaces';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonErrorCodes } from '@pelaguru/error-codes';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private firebaseAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router
  ) {
    this.firebaseAuth.authState
      .pipe(map(async (u) => !!u))
      .subscribe(async (u) => {
        AuthService.isUserAuthenticated.next(await u);
      });

    this.firebaseAuth.onAuthStateChanged(async (u) => {
      if (!!u) {
        this.getUserDetails(u.uid);
      } else {
        AuthService.userObservable.next(null);
      }
    });
  }

  private static isUserAuthenticated: BehaviorSubject<
    boolean
  > = new BehaviorSubject<boolean>(false);
  private static userObservable = new BehaviorSubject<User>(null);

  async getUserDetails(uid: string) {
    try {
      const afsUserRef: AngularFirestoreDocument<User> = this.fireStore.doc(
        `Users/${uid}`
      );
      const user = await afsUserRef.get().toPromise();
      if (user.exists) {
        AuthService.userObservable.next(user.data() as User);
      } else {
        AuthService.userObservable.next(null);
      }
    } catch (error) {
      console.log('Error while getting data.', error);
      AuthService.userObservable.next(null);
      this.logout();
    }
  }

  isAuthenticated() {
    return this.firebaseAuth.authState.pipe(
      first(),
      map((u) => !!u)
    );
  }

  isVendor() {
    return AuthService.userObservable.pipe(
      map((user) => user?.role === UserRole.Vendor)
    );
  }

  isNormalUser() {
    return AuthService.userObservable.pipe(
      map((user) => user?.role === UserRole.NormalUser)
    );
  }

  logout() {
    return from(this.firebaseAuth.signOut());
  }

  async signInWithEmailPassword(
    email: string,
    password: string
  ): Promise<ServiceResponse> {
    return new Promise<ServiceResponse>(async (_resolve) => {
      try {
        const credentials = await this.firebaseAuth.signInWithEmailAndPassword(
          email,
          password
        );
        _resolve(
          new ServiceResponse(
            true,
            'Logged in',
            null,
            null,
            credentials.user.uid
          )
        );
      } catch (error) {
        _resolve(
          new ServiceResponse(false, 'Not logged in', error.code, error, null)
        );
      }
    });
  }

  async signUpWithEmailPassword(
    name: string,
    email: string,
    password: string
  ): Promise<ServiceResponse> {
    return new Promise<ServiceResponse>(async (_resolve) => {
      try {
        const data = { email, password, name };
        const authResult = await this.http
          .post<ServerResponse>('/api/auth/normal-user', data)
          .toPromise();
        if (authResult.success) {
          this.firebaseAuth.signInWithEmailAndPassword(email, password);
          _resolve(
            new ServiceResponse(
              true,
              'User added',
              authResult.errorCode,
              null,
              authResult.data
            )
          );
        } else {
          _resolve(
            new ServiceResponse(
              false,
              'User not added',
              authResult.errorCode,
              null,
              authResult.data
            )
          );
        }
      } catch (error) {
        _resolve(
          new ServiceResponse(
            false,
            'User not added',
            CommonErrorCodes.InternalError,
            error,
            null
          )
        );
      }
    });
  }

  async loginWithGoogle() {
    return new Promise<ServiceResponse>(async (_resolve) => {
      try {
        const provider = new auth.GoogleAuthProvider();
        const credentials = await this.firebaseAuth.signInWithPopup(provider);
        this.updateUser(credentials.user);
        // _resolve(new ServiceResponse(true, 'SUCCESS', null, null));
      } catch (error) {
        // _resolve(new ServiceResponse(false, 'FIREAUTH_ERROR', error, null));
      }
    });
  }

  private async updateUser({
    uid,
    displayName,
    email,
    photoURL,
    emailVerified,
  }) {
    const afsUserRef: AngularFirestoreDocument<User> = this.fireStore.doc(
      `users/${uid}`
    );

    const user = await afsUserRef.get().toPromise();

    if (!user.exists) {
      const userData: User = {
        displayName,
        email,
        profilePictureUrl: photoURL,
      } as User;

      afsUserRef.set(userData, { merge: true });
    } else {
      const userData: User = {
        displayName,
        email,
        profilePictureUrl: photoURL,
      } as User;

      afsUserRef.set(userData, { merge: true });
    }
    this.router.navigate(['/']);
  }

  get userData(): Observable<User> {
    return AuthService.userObservable;
  }
}
