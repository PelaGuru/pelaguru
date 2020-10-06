import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'pelaguru-detail-diseas',
  templateUrl: './detail-diseas.component.html',
  styleUrls: ['./detail-diseas.component.scss'],
})
export class DetailDiseasComponent implements OnInit {
  diseaseName = '';
  id = '';
  image = '';
  additionalFeatures = [];
  commonPlants = [];
  commonSymptomps = [];
  solutions = [];
  constructor(private router: Router, private fireStore: AngularFirestore) {}

  async ngOnInit() {
    console.log((this.id = this.router.url.split('/')[2]));
    const cityRef = this.fireStore.collection('Diseases').doc(this.id);
    const doc = await cityRef.get().toPromise();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      this.additionalFeatures = doc.data().additionalFeatures;
      this.commonPlants = doc.data().commonPlants;
      this.commonSymptomps = doc.data().commonSymptomps;
      this.solutions = doc.data().solutions;
      this.image = doc.data().image;
      this.diseaseName = doc.data().diseaseName;
    }
  }
}
