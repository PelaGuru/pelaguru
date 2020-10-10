import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ServiceResponse, User, UserRole } from '@pelaguru/interfaces';
import { BehaviorSubject, from, of } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static userObservable = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient,
    private firebaseAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router
  ) {
    this.firebaseAuth.onAuthStateChanged(async (u) => {
      if (!!u) {
        this.getUserDetails(u.uid);
      } else {
        AuthService.userObservable.next(null);
      }
    });
  }

  isAuthenticated() {
    return this.firebaseAuth.authState.pipe(
      first(),
      map((u) => !!u)
    );
  }

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

  getUserStream() {
    return this.firebaseAuth.user.pipe(
      switchMap((user) => {
        if (!user) return of(null);
        return from(user.getIdTokenResult());
      }),
      map((result) => {
        if (result) {
          // user is logged in
          const user = {
            userId: result.claims.user_id,
            email: result.claims.email,
            displayName: result.claims.name,
            profilePicture: result.claims.picture,
            role:
              typeof result.claims.role === 'string'
                ? result.claims.role
                : UserRole.NormalUser,
          };
          return user;
        }
        return null;
      })
    );
  }

  logout() {
    return from(this.firebaseAuth.signOut());
  }

  get userData() {
    return AuthService.userObservable.asObservable();
  }
}
