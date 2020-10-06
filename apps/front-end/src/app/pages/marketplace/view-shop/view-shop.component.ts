import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ShopCatalogueItem, ViewShopItem } from '@pelaguru/interfaces';
import {ShopService} from '../../../core/shop-service/shop.service';
import { Router } from '@angular/router';
@Component({
  selector: 'pelaguru-view-shop',
  templateUrl: './view-shop.component.html',
  styleUrls: ['./view-shop.component.scss'],
})
export class ViewShopComponent implements OnInit {
  private ShopItemsDataSource: BehaviorSubject<
    Array<ShopCatalogueItem>
  > = new BehaviorSubject<Array<ShopCatalogueItem>>([]);
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  searchController: FormGroup;
  constructor(private shopService : ShopService,private router : Router) {
    // shop = SHOP;
    this.searchController = new FormGroup({
      search: new FormControl(),
    });
    // this.addTestData();
    this.getShopItems();
  }

  // constructor() {}

  // ngOnInit(): void {
  //   this.getShop();
  // }

  // getShop(): void {
  //   //this.plantService.getPlant().subscribe(plant => this.plant = plant);
  // }
  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  async getShopItems() {
    const items = await this.shopService.getShopItems(this.router.url.split('/')[2]);
    this.ShopItemsDataSource.next(items);
  }

  // addTestData(): void {
  //   this.viewshopItemsDataSource.next([
  //     {
  //       id: '876543',
  //       name: 'Sil-One',
  //       price: 'Rs. 250.00',
  //       image: '../../../assets/img/temp/4.png',
  //     },
  //     {
  //       id: '876543',
  //       name: 'Methyal Eugenol',
  //       price: 'Rs. 150.00',
  //       image: '../../../assets/img/temp/2.jpg',
  //     },
  //     {
  //       id: '876543',
  //       name: 'Magic Hydrogel',
  //       price: 'Rs. 550.00',
  //       image: '../../../assets/img/temp/3.jpg',
  //     },
  //     {
  //       id: '876543',
  //       name: 'Methyal Eugenol',
  //       price: 'Rs. 350.00',
  //       image: '../../../assets/img/temp/2.jpg',
  //     },
  //     {
  //       id: '876543',
  //       name: 'Sil-One',
  //       price: 'Rs. 150.00',
  //       image: '../../../assets/img/temp/4.png',
  //     },
  //     {
  //       id: '876543',
  //       name: 'Magic Hydrogel',
  //       price: 'Rs. 150.00',
  //       image: '../../../assets/img/temp/3.jpg',
  //     },
  //   ]);
  // }

  get viewshopItems(): Observable<Array<ShopCatalogueItem>> {
    return this.ShopItemsDataSource.asObservable();
  }
}
