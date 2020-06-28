import { Component, OnInit } from '@angular/core';
import { NavLinkData } from '../models/nav-link-data';

@Component({
  selector: 'pelaguru-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  navLinks: Array<NavLinkData> = [
    { label: 'Home', link: '/home' },
    { label: 'Plants', link: '/plants' },
    { label: 'Diseases', link: '/diseases' },
    { label: 'Marketplace', link: '/marketplace' },
    { label: 'My Shop', link: '/my-shop/dashboard' },
  ];

  socialLinks:Array<NavLinkData> =[
      {label:'About Us',link:'/aboutUs'}
  ]


  constructor() {}

  ngOnInit(): void {}
}
