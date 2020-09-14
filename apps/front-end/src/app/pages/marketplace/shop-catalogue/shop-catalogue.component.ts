import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ShopCatalogueItem } from '@pelaguru/interfaces';
@Component({
  selector: 'pelaguru-shop-catalogue',
  templateUrl: './shop-catalogue.component.html',
  styleUrls: ['./shop-catalogue.component.scss'],
})
export class ShopCatalogueComponent implements OnInit {
  private shopCatalogueItemsDataSource: BehaviorSubject<
    Array<ShopCatalogueItem>
  > = new BehaviorSubject<Array<ShopCatalogueItem>>([]);
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  searchController: FormGroup;
  constructor() {
    this.searchController = new FormGroup({
      search: new FormControl(),
    });
    this.addTestData();
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
  addTestData(): void {
    this.shopCatalogueItemsDataSource.next([
      {
        id: '876543',
        image: '../../../assets/img/temp/shop.webp',
        name: 'Tomato',
        sciName: 'Lycopersicon esculentum',
        username: 'tomato'
      },
      {
        id: '876543',
        image: '../../../assets/img/temp/1.jpg',
        name: 'Tomato',
        sciName: 'Lycopersicon esculentum',
        username: 'tomato'
      },
      {
        id: '876543',
        image: '../../../assets/img/temp/1.jpg',
        name: 'Tomato',
        sciName: 'Lycopersicon esculentum',
        username: 'tomato'
      },
      {
        id: '876543',
        image: '../../../assets/img/temp/shop.webp',
        name: 'Tomato',
        sciName: 'Lycopersicon esculentum',
        username: 'tomato'
      },
      {
        id: '876543',
        image: '../../../assets/img/temp/shop.webp',
        name: 'Tomato',
        sciName: 'Lycopersicon esculentum',
        username: 'tomato'
      }
    ]);
  }

  get shopCatalogueItems(): Observable<Array<ShopCatalogueItem>> {
    return this.shopCatalogueItemsDataSource.asObservable();
  }
}
