import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'pelaguru-details-plant',
  templateUrl: './details-plant.component.html',
  styleUrls: ['./details-plant.component.scss'],
})
export class DetailsPlantComponent implements OnInit {
  name = '';
  id = '';
  commonDiseases = '';
  image = '';
  scientificName = '';
  uses = [];
  constructor(private router: Router, private fireStore: AngularFirestore) {}

  async ngOnInit() {
    console.log((this.id = this.router.url.split('/')[2]));
    const cityRef = this.fireStore.collection('Plants').doc(this.id);
    const doc = await cityRef.get().toPromise();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      this.commonDiseases = doc.data().commonDiseases;
      this.image = doc.data().image;
      this.name = doc.data().plantName;
      this.scientificName = doc.data().scientificName;
      this.uses = doc.data().uses;
    }
  }
}
