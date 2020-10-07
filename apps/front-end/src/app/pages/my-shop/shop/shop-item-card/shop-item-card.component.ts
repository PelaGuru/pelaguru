import { Component, Input, OnInit } from '@angular/core';
import { ShopItem } from '@pelaguru/interfaces';

@Component({
  selector: 'pelaguru-shop-item-card',
  templateUrl: './shop-item-card.component.html',
  styleUrls: ['./shop-item-card.component.scss'],
})
export class ShopItemCardComponent implements OnInit {
  @Input() data: ShopItem;
  constructor() {}

  ngOnInit(): void {}
}
