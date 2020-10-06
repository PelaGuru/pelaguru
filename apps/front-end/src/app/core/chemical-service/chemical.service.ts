import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, first, switchMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import {
  User,
  UserRole,
  ServiceResponse,
  ServerResponse,
  ShopCatalogueItem,
  Disease,
} from '@pelaguru/interfaces';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonErrorCodes } from '@pelaguru/error-codes';

@Injectable({
  providedIn: 'root',
})
export class ChemicalService {
  constructor(
    private http: HttpClient,
    private fireStore: AngularFirestore,
    private router: Router
  ) {}

  async getMatchingChemicals(diseaseId: string): Promise<ShopCatalogueItem[]> {
    try {
      const colRef = await firebase
        .firestore()
        .collectionGroup('items')
        .where('diseases', 'array-contains', diseaseId)
        .get();
      if (colRef.empty) {
        return [];
      } else {
        return colRef.docs.map((d) => {
          return d.data() as ShopCatalogueItem;
        });
      }
    } catch (error) {
      return [];
    }
  }
}
