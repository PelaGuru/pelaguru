import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ShopCatalogueItem, ViewShopItem } from '@pelaguru/interfaces';
import { ShopService } from '../../../core/shop-service/shop.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ShopMessageDialogComponent } from './shop-message-dialog/shop-message-dialog.component';

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
  constructor(
    private shopService: ShopService,
    private router: Router,
    private dialog: MatDialog
  ) {
    // shop = SHOP;
    this.searchController = new FormGroup({
      search: new FormControl(),
    });
    // this.addTestData();
    this.getShopItems();
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

  async getShopItems() {
    const items = await this.shopService.getShopItems(
      this.router.url.split('/')[2]
    );
    this.ShopItemsDataSource.next(items);
  }

  get viewshopItems(): Observable<Array<ShopCatalogueItem>> {
    return this.ShopItemsDataSource.asObservable();
  }

  openMessageDialog() {
    const dialogRef = this.dialog.open(ShopMessageDialogComponent, {
      data: { shopId: this.router.url.split('/')[2] },
      width: '50vw',
      disableClose: true,
    });
  }
}
