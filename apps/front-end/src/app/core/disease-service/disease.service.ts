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
  DiseaseCatalogueItem,
  Disease,
} from '@pelaguru/interfaces';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonErrorCodes } from '@pelaguru/error-codes';

@Injectable({
  providedIn: 'root',
})
export class DiseaseService {
  constructor(
    private http: HttpClient,
    private fireStore: AngularFirestore,
    private router: Router
  ) {}

  async getAllDiseases(): Promise<DiseaseCatalogueItem[]> {
    const colRef = await this.fireStore
      .collection('Diseases')
      .get()
      .toPromise();
    const data = colRef.docs.map((d) => {
      return d.data() as DiseaseCatalogueItem;
    });
    return data;
  }

  async getDisease(docId: string) {
    console.log('DocId', docId);

    const ref = this.fireStore.doc(`Diseases/${docId}`);
    const data = await ref.get().toPromise();
    console.log('Doc', data.data());
    return data.data() as DiseaseCatalogueItem;
  }
}
