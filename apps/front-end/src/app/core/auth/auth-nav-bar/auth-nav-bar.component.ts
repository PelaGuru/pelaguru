import { Component, OnInit, Input } from '@angular/core';
import { NavLinkData } from '../../../shared/models/nav-link-data';
import { NavDrawerService } from '../../nav-drawer-service/nav-drawer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'pelaguru-auth-nav-bar',
  templateUrl: './auth-nav-bar.component.html',
  styleUrls: ['./auth-nav-bar.component.scss'],
})
export class AuthNavBarComponent implements OnInit {
  @Input() authPage: string;

  navLinks: Array<NavLinkData> = [
    { label: 'Home', link: '/home' },
    { label: 'Plants', link: '/plants' },
    { label: 'Diseases', link: '/diseases' },
    { label: 'Marketplace', link: '/marketplace' },
    // { label: 'My Shop', link: '/my-shop' }
  ];
  constructor(private navDrawerService: NavDrawerService) {}

  ngOnInit(): void {}
}
