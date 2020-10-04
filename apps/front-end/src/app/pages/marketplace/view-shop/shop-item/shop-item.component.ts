import { Component, OnInit } from '@angular/core';
import { ShopItem } from './ShopItem';
@Component({
  selector: 'pelaguru-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss'],
})
export class ShopItemComponent implements OnInit {
  constructor() {}
  shopitem = ShopItem;

  ngOnInit(): void {
    this.getShopItem();
  }

  getShopItem(): void {
    //this.plantService.getPlant().subscribe(plant => this.plant = plant);
  }
}
