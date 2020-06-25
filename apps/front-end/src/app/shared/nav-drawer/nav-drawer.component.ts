import { Component, OnInit } from '@angular/core';
import { NavLinkData } from '../models/nav-link-data';

@Component({
  selector: 'pelaguru-nav-drawer',
  templateUrl: './nav-drawer.component.html',
  styleUrls: ['./nav-drawer.component.scss']
})
export class NavDrawerComponent implements OnInit {
  navLinks: Array<NavLinkData> = [
    { label: 'Home', link: '/home' },
    { label: 'Plants', link: '/plants' },
    { label: 'Diseases', link: '/diseases' },
    { label: 'Marketplace', link: '/marketplace' },
    { label: 'My Shop', link: '/my-shop' }
  ];
  constructor() {}

  ngOnInit(): void {}
}
