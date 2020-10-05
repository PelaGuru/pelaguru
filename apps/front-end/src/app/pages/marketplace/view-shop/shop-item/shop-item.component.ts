import { Component, OnInit } from '@angular/core';
import { ShopItem } from './ShopItem';
import { Observable, BehaviorSubject, from } from 'rxjs';
import {
  ChemicalSuggestionItem,
  DiseaseCatalogueItem,
  ShopCatalogueItem,
} from '@pelaguru/interfaces';
import { FormGroup, FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import {ShopService} from '../../../../core/shop-service/shop.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pelaguru-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss'],
})
export class ShopItemComponent implements OnInit {
  private ShopCatalogueDataSource: BehaviorSubject<
  ShopCatalogueItem
> = new BehaviorSubject<ShopCatalogueItem>(null);
  constructor(private shopService : ShopService,private router : Router) {}
  //shopitem = ShopItem;

  ngOnInit(): void {
    this.getShopItem();
  }
  // this.router.url.split('/')[2],

  async getShopItem() {
    console.log('URL',this.router.url.split('/'));
    const docId = this.router.url.split('/')[2];
    const itemId = this.router.url.split('/')[3];
    
    // const item = await this.shopService.getShopItem(
    //   "LjlULFtTzeauekAJl4Lk","kFcTp7uc30lrqfu0Y46A"
    // );
    const item = await this.shopService.getShopItem(
      docId,itemId
    );
    console.log("item",item);
    
    this.ShopCatalogueDataSource.next(item);
  }
  get shopCatalogueItems(): Observable<ShopCatalogueItem> {
    return this.ShopCatalogueDataSource.asObservable();
  }
}
