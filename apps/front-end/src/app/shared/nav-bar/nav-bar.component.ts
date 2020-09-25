import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DrawerSatateData } from '../models/drawer-satate-data';
import { RightDrawerStateData } from '../models/right-drawer-state-data';
import { NavLinkData } from '../models/nav-link-data';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../../core/auth/auth.service';
import { User } from '@pelaguru/interfaces';

@Component({
  selector: 'pelaguru-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  profilePicUrl = '';

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
    // { label: 'My Shop', link: '/my-shop' }
  ];
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userData.subscribe((user) => {
      if (!!user) {
        this.profilePicUrl = user.profilePictureUrl;
      }
    });
  }

  navDrawerToggle() {
    this.toggleNavDrawer.emit({
      navDrawerState: this.navDrawerSatate,
      rightDrawerState: this.rightDrawerSatate,
    });
  }

  rightDrawerToggle(view: string) {
    this.toggleRightDrawer.emit({
      view,
      navDrawerState: this.navDrawerSatate,
      rightDrawerState: this.rightDrawerSatate,
    });
  }

  get isAuthenticated(): Observable<boolean> {
    return this.authService.isAuthenticated();
  }

  get userData() {
    return this.authService.userData;
  }

  get isVendor() {
    return this.authService.isVendor();
  }
}
