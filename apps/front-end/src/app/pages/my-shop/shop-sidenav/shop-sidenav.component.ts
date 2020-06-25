import { Component, OnInit } from '@angular/core';

interface ShopSideNavData {
  icon: string;
  link: string;
  label: string;
}

@Component({
  selector: 'pelaguru-shop-sidenav',
  templateUrl: './shop-sidenav.component.html',
  styleUrls: ['./shop-sidenav.component.scss']
})
export class ShopSidenavComponent implements OnInit {
  shopSideNavData: Array<ShopSideNavData> = [
    { icon: 'dashboard', label: 'Dashboard', link: '/my-shop/dashboard' },
    { icon: 'shopping_cart', label: 'Shop', link: '/my-shop/shop' },
    { icon: 'chat', label: 'Messages', link: '/my-shop/messages' },
    {
      icon: 'account_balance_wallet',
      label: 'Payments',
      link: '/my-shop/payments'
    },
    { icon: 'settings', label: 'Settings', link: '/my-shop/settings' }
  ];
  constructor() {}

  ngOnInit(): void {}
}
