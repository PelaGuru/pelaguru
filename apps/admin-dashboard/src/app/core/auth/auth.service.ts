import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ServiceResponse } from '@pelaguru/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private firebaseAuth: AngularFireAuth,
    private fireStore: AngularFirestore,
    private router: Router
  ) {}

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
}
