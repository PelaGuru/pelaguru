import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Shop, ShopItem } from '@pelaguru/interfaces';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'pelaguru-shop-items-overview',
  templateUrl: './shop-items-overview.component.html',
  styleUrls: ['./shop-items-overview.component.scss'],
})
export class ShopItemsOverviewComponent implements OnInit {
  items: BehaviorSubject<ShopItem[]> = new BehaviorSubject([]);
  constructor(
    private authService: AuthService,
    private fireStore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.getAllItems()
  }

  getAllItems() {
    this.authService
      .getUserStream()
      .pipe(
        switchMap(async (response) => {
          const data = await this.fireStore.firestore
            .collection('Shops')
            .where('vendorId', '==', response.userId)
            .get();
          const shopId = (data.docs[0].data() as Shop).id;
          const dataRef = this.fireStore
            .collection('Shops')
            .doc(shopId)
            .collection('items');
          const docs = await dataRef.get().toPromise();
          if (docs.empty) {
            this.items.next([]);
          } else {
            const docsData = docs.docs.map((d) => {
              return d.data() as ShopItem;
            });
            this.items.next(docsData);
          }
        })
      )
      .subscribe();
  }
}
