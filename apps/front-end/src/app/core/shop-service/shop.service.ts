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
  ShopCatalogueItem,
  Disease,
} from '@pelaguru/interfaces';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonErrorCodes } from '@pelaguru/error-codes';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(
    private http: HttpClient,
    private fireStore: AngularFirestore,
    private router: Router
  ) { }
  async getAllShops(): Promise<ShopCatalogueItem[]> {
    const colRef = await this.fireStore.collection('Shops').get().toPromise();
    const data = colRef.docs.map((d) => {
      return d.data() as ShopCatalogueItem;
    });
    return data;
  }
  async getShopItems(docId : string): Promise<ShopCatalogueItem[]> {
    const colRef = await this.fireStore.doc(`Shops/${docId}`).collection("items").get().toPromise();
    const data = colRef.docs.map((d) => {
      return d.data() as ShopCatalogueItem;
    });
    console.log("Data",data);
    
    return data;
  }
  // async getShopItems(docId: string) {
  //   console.log('DocId', docId);

  //   const ref = this.fireStore.doc(`Shops/${docId}`);
  //   const data = await ref.get().toPromise();
  //   console.log('Doc', data.data());
  //   return data.data() as ShopCatalogueItem;
  // }
}
