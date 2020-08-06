import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Disease, FirestoreOperation, Image } from '@pelaguru/interfaces';
import { forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class DiseasService {
  private readonly BASE_PATH = 'diseases';
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

  async addDiseas(data: {
    causes: string;
    diseaseName: string;
    id: string;
    image: string;
    additionalFeatures: string[];
    commonPlants: string[];
    commonSymptoms: string[];
    solutions: string[];
  }) {
    const ref = this.fireStore.doc(`Diseases/${data.id}`);
    const setData: FirestoreOperation<Disease> = {
      ...data,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    return await ref.set(setData);
  }

  async editDiseas(
    id: string,
    name: string,
    description: string,
    imageData: Image[]
  ) {
    const ref = this.fireStore.doc(`Diseases/${id}`);
    const data = {
      id,
      description: description,
      name: name,
      images: imageData,
    };
    return await ref.set(data);
  }

  async editDiseasWithoutImageUpdate(
    id: string,
    name: string,
    description: string
  ) {
    const ref = this.fireStore.doc(`Diseases/${id}`);
    const data = {
      id,
      description: description,
      name: name,
    };
    return await ref.update(data);
  }

  async getAllDiseases() {
    const ref = this.fireStore.collection<Disease>('Diseases');
    const data = await ref
      .get()
      .pipe(
        map((snap) => {
          return snap.docs.map((d) => {
            return d.data() as Disease;
          });
        })
      )
      .toPromise();
    return data;
  }

  async deleteDiseases(id) {
    const ref = this.fireStore.collection<Disease>('Diseases');
    const data = await ref.doc(id).delete();
    return data;
  }
}
