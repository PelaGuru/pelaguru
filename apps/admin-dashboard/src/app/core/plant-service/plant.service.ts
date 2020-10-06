import { Injectable } from '@angular/core';
import { FirestoreOperation } from '@pelaguru/interfaces';
import { AngularFirestore } from '@angular/fire/firestore';
import { CommonDiseases, Plant } from '@pelaguru/interfaces';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  constructor(private fireStore: AngularFirestore) {}

  async addPlant(
    image: string,
    plantName: string,
    scientificName: string,
    commonDiseases: CommonDiseases[],
    uses: string[]
  ) {
    const ref = this.fireStore.firestore.collection('Plants').doc();
    const data: FirestoreOperation<Plant> = {
      id: ref.id,
      image,
      plantName,
      uses,
      commonDiseases,
      scientificName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    await ref.set(data);
  }
}
