import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pelaguru-view-shop-item',
  templateUrl: './view-shop-item.component.html',
  styleUrls: ['./view-shop-item.component.scss'],
})
export class ViewShopItemComponent implements OnInit {
  breadcrumbData = JSON.stringify([
    { label: 'My shop', link: '/my-shop/shop-items/' },
    { label: 'Items', link: '/my-shop/shop-items/' },
    { label: 'chem 1' },
  ]);
  constructor() {}

  ngOnInit(): void {}
}
