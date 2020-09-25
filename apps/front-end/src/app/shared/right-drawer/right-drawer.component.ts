import { Component, OnInit, Input } from '@angular/core';
import { NavLinkData } from '../models/nav-link-data';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { RightDrawerServiceService } from '../../core/right-drawer-service/right-drawer-service.service';

@Component({
  selector: 'pelaguru-right-drawer',
  templateUrl: './right-drawer.component.html',
  styleUrls: ['./right-drawer.component.scss'],
})
export class RightDrawerComponent implements OnInit {
  @Input() viewState: string;
  profileLinks: Array<NavLinkData> = [{ label: 'Profile', link: '/profile' }];
  constructor(
    private authService: AuthService,
    private router: Router,
    private rightDrawerServiceService: RightDrawerServiceService
  ) {}

  ngOnInit(): void {}

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['/']);
    this.rightDrawerServiceService.setNavDrawerState(false);
  }

  get userData() {
    return this.authService.userData;
  }

  get isVendor() {
    return this.authService.isVendor();
  }
}
