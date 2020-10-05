import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FirestoreOperation, Image } from '@pelaguru/interfaces';
import * as firebase from 'firebase/app';
import { forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  private readonly BASE_PATH = 'Plants';
  constructor(
    private fireStore: AngularFirestore,
    private fireStorage: AngularFireStorage
  ) {}

  getDocId(): string {
    return this.fireStore.collection('Plants').doc().ref.id;
  }

  async addPlant(
    id: string,
    name: string,
    description: string,
    imageData: Image[]
  ) {
    const ref = this.fireStore.doc(`Plants/${id}`);
    const data: FirestoreOperation<any> = {
      id,
      description: description,
      name: name,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      images: imageData,
    };
    return await ref.set(data);
  }

  async editPlant(
    id: string,
    name: string,
    description: string,
    imageData: Image[]
  ) {
    const ref = this.fireStore.doc(`Plants/${id}`);
    const data: Partial<any> = {
      id,
      description: description,
      name: name,
      images: imageData,
    };
    return await ref.set(data);
  }

  async editPlantWithoutImageUpdate(
    id: string,
    name: string,
    description: string
  ) {
    const ref = this.fireStore.doc(`Plants/${id}`);
    const data: Partial<any> = {
      id,
      description: description,
      name: name,
    };
    return await ref.update(data);
  }

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

  async uploadImage(files: File[], id: string) {
    const baseFilePath = `${this.BASE_PATH}/${id}/`;
    const uploadEvents = files.map(async (file) => {
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
      return {
        name: file.name,
        id: this.geneateId(),
        url,
      } as Image;
    });
    return await Promise.all(uploadEvents);
  }

  async getAllPlants() {
    const ref = this.fireStore.collection<any>('Plants');
    const data = await ref
      .get()
      .pipe(
        map((snap) => {
          return snap.docs.map((d) => {
            return d.data() as any;
          });
        })
      )
      .toPromise();
    return data;
  }

  async deleteChamical(id: string) {
    const ref = this.fireStore.doc(`Plants/${id}`);
    await ref.delete();
  }
}
