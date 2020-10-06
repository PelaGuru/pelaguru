import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'pelaguru-detail-chemical',
  templateUrl: './detail-chemical.component.html',
  styleUrls: ['./detail-chemical.component.scss'],
})
export class DetailChemicalComponent implements OnInit {
  name = '';
  id = '';
  description = '';
  imageToShow = '';
  constructor(private router: Router, private fireStore: AngularFirestore) {}

  async ngOnInit() {
    console.log((this.id = this.router.url.split('/')[2]));
    const cityRef = this.fireStore.collection('Chemicals').doc(this.id);
    const doc = await cityRef.get().toPromise();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      this.description = doc.data().description;
      this.imageToShow = doc.data().images[0].url;
      this.name = doc.data().name;
    }
  }
}
