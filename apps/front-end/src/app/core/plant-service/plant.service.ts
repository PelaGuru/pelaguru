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
  PlantCatalogueItem,
  Disease,
} from '@pelaguru/interfaces';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonErrorCodes } from '@pelaguru/error-codes';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  constructor(
    private http: HttpClient,
    private fireStore: AngularFirestore,
    private router: Router
  ) {}

  async getAllPlants(): Promise<PlantCatalogueItem[]> {
    const colRef = await this.fireStore.collection('Plants').get().toPromise();
    const data = colRef.docs.map((d) => {
      return d.data() as PlantCatalogueItem;
    });
    return data;
  }
  async getPlant(docId: string) {
    console.log('DocId', docId);

    const ref = this.fireStore.doc(`Plants/${docId}`);
    const data = await ref.get().toPromise();
    console.log('Doc', data.data());
    return data.data() as PlantCatalogueItem;
  }
}
