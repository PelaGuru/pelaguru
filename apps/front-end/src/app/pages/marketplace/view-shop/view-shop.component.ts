import { Component, OnInit } from '@angular/core';
import { SHOP } from './shop';
@Component({
  selector: 'pelaguru-view-shop',
  templateUrl: './view-shop.component.html',
  styleUrls: ['./view-shop.component.scss'],
})
export class ViewShopComponent implements OnInit {
  constructor() {}
  shop = SHOP;
  ngOnInit(): void {
    this.getShop();
  }

  getShop(): void {
    //this.plantService.getPlant().subscribe(plant => this.plant = plant);
  }
}
