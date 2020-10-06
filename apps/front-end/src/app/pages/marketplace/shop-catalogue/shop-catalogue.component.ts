import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Shop, ShopCatalogueItem } from '@pelaguru/interfaces';
import {ShopService} from '../../../core/shop-service/shop.service';
@Component({
  selector: 'pelaguru-shop-catalogue',
  templateUrl: './shop-catalogue.component.html',
  styleUrls: ['./shop-catalogue.component.scss'],
})
export class ShopCatalogueComponent implements OnInit {
  private ShopCatalogueItemsDataSource: BehaviorSubject<
    Array<ShopCatalogueItem>
  > = new BehaviorSubject<Array<ShopCatalogueItem>>([]);
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  searchController: FormGroup;
  constructor(private shopService : ShopService) {
    this.searchController = new FormGroup({
      search: new FormControl(),
    });
    // this.addTestData();
    this.getAllShops();
  }

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

  async getAllShops() {
    const shops = await this.shopService.getAllShops();
    this.ShopCatalogueItemsDataSource.next(shops);
  }

  // addTestData(): void {
  //   this.shopCatalogueItemsDataSource.next([
  //     {
  //       id: '876543',
  //       image: '../../../assets/img/temp/shop.webp',
  //       name: 'Shop 1',
  //       username: 'Shop 1',
  //       telephone: '031-2223245',
  //       address: '131, jude rd, Negombo',
  //       description:
  //         'Chemical storage is the storage of controlled substances or hazardous materials in chemical stores',
  //     },
  //     {
  //       id: '876543',
  //       image:
  //         '../../../assets/img/temp/cleaning-supplies-sprays-liquids-detergents-260nw-1623039685.webp',
  //       name: 'Shop 2',
  //       username: 'Shop 2',
  //       telephone: '031-2223245',
  //       address: '131, jude rd, Negombo',
  //       description:
  //         'Chemical storage is the storage of controlled substances or hazardous materials in chemical stores',
  //     },
  //     {
  //       id: '876543',
  //       image:
  //         '../../../assets/img/temp/minsk-belarus-march-14-2018-600w-1048132474.webp',
  //       name: 'Shop 3',
  //       username: 'Shop 3',
  //       telephone: '031-2223245',
  //       address: '131, jude rd, Negombo',
  //       description:
  //         'Chemical storage is the storage of controlled substances or hazardous materials in chemical stores',
  //     },
  //     {
  //       id: '876543',
  //       image: '../../../assets/img/temp/shop.webp',
  //       name: 'Shop 4',
  //       username: 'Shop 4',
  //       telephone: '031-2223245',
  //       address: '131, jude rd, Negombo',
  //       description:
  //         'Chemical storage is the storage of controlled substances or hazardous materials in chemical stores',
  //     },
  //     {
  //       id: '876543',
  //       image:
  //         '../../../assets/img/temp/cleaning-supplies-sprays-liquids-detergents-260nw-1623039685.webp',
  //       name: 'Shop 5',
  //       username: 'Shop 5',
  //       telephone: '031-2223245',
  //       address: '131, jude rd, Negombo',
  //       description:
  //         'Chemical storage is the storage of controlled substances or hazardous materials in chemical stores',
  //     },
  //   ]);
  // }

  get shopCatalogueItems(): Observable<Array<ShopCatalogueItem>> {
    return this.ShopCatalogueItemsDataSource.asObservable();
  }
}
