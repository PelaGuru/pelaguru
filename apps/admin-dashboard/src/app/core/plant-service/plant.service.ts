import { Injectable } from '@angular/core';
import { FirestoreOperation } from '@pelaguru/interfaces';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { CommonDiseases, Plant } from '@pelaguru/interfaces';
import * as firebase from 'firebase/app';
import { forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  private readonly BASE_PATH = 'plants';
  constructor(
    private fireStore: AngularFirestore,
    private fireStorage: AngularFireStorage
  ) {}

  geneateId() {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const autoId = `${new Date().getTime()}${new Date().getTime()}`;
    const ar = Array.from(autoId).map((d) => {
      return (
        Array.from(chars)
          .sort(() => Math.random() - 0.5)
          .join('')
          // tslint:disable-next-line: radix
          .charAt(Number.parseInt(d))
      );
    });
    return ar.join('');
  }

  async uploadImage(file: File, id: string) {
    const baseFilePath = `${this.BASE_PATH}/${id}/`;
    // return await Promise.all(uploadEvents);
    const filePath = `${baseFilePath}/${new Date().getTime()}_${file.name}`;
    const fileRef = this.fireStorage.ref(filePath);
    const task = this.fireStorage.upload(filePath, file);
    // tslint:disable-next-line: deprecation
    const url = await forkJoin(task.snapshotChanges())
      .pipe(
        mergeMap(() => fileRef.getDownloadURL()),
        // tslint:disable-next-line: no-shadowed-variable
        map((url) => url as string)
      )
      .toPromise();
    return url;
  }

  async addPlant(
    id,
    plantName: string,
    scientificName: string,
    commonDiseases: string[],
    uses: string[],
    image: string
  ) {
    const ref = this.fireStore.firestore.collection('Plants').doc();
    const data: FirestoreOperation<any> = {
      id: ref.id,
      image,
      plantName,
      uses,
      commonDiseases,
      scientificName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    // console.log(data);
    await ref.set(data);
  }
  async getAllPlants() {
    const ref = this.fireStore.collection<any>('Plants');
    const data = await ref
      .get()
      .pipe(
        map((snap) => {
          return snap.docs.map((d) => {
            return d.data();
          });
        })
      )
      .toPromise();
    return data;
  }

  async deletePlant(id) {
    const ref = this.fireStore.collection<any>('Plants');
    const data = await ref.doc(id).delete();
    return data;
  }
}
