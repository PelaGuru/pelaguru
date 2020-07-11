import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DrawerSatateData } from '../models/drawer-satate-data';
import { RightDrawerStateData } from '../models/right-drawer-state-data';
import { NavLinkData } from '../models/nav-link-data';

@Component({
  selector: 'pelaguru-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @Output() toggleNavDrawer: EventEmitter<DrawerSatateData> = new EventEmitter<
    DrawerSatateData
  >();
  @Output() toggleRightDrawer: EventEmitter<
    RightDrawerStateData
  > = new EventEmitter<RightDrawerStateData>();

  @Input() navDrawerSatate: boolean;
  @Input() rightDrawerSatate: boolean;

  navLinks: Array<NavLinkData> = [
    { label: 'Home', link: '/home' },
    { label: 'Plants', link: '/plants' },
    { label: 'Diseases', link: '/diseases' },
    { label: 'Marketplace', link: '/marketplace' },
    { label: 'My Shop', link: '/my-shop' }
  ];
  constructor() {}

  ngOnInit(): void {}

  navDrawerToggle() {
    this.toggleNavDrawer.emit({
      navDrawerState: this.navDrawerSatate,
      rightDrawerState: this.rightDrawerSatate
    });
  }

  rightDrawerToggle(view: string) {
    this.toggleRightDrawer.emit({
      view,
      navDrawerState: this.navDrawerSatate,
      rightDrawerState: this.rightDrawerSatate
    });
  }
}
