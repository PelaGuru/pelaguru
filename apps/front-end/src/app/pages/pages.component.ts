import { Component, OnInit, ViewChild } from '@angular/core';
import { NavDrawerService } from '../core/nav-drawer-service/nav-drawer.service';
import { RightDrawerServiceService } from '../core/right-drawer-service/right-drawer-service.service';
import { RightDrawerStateData } from '../shared/models/right-drawer-state-data';
import { DrawerSatateData } from '../shared/models/drawer-satate-data';
import { Observable } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'pelaguru-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  rightSidenavViewState: string;

  @ViewChild('navDrawer', { static: true }) navDrawer: MatSidenav;
  @ViewChild('rightDrawer', { static: true }) rightDrawer: MatSidenav;

  constructor(
    private navDrawerService: NavDrawerService,
    private rightDrawerServiceService: RightDrawerServiceService
  ) {}

  get navDrawerSatate(): Observable<boolean> {
    return this.navDrawerService.getNavDraverState();
  }

  get rightDrawerSatate(): Observable<boolean> {
    return this.rightDrawerServiceService.getNavDraverState();
  }
  ngOnInit(): void {
    this.initDrawerCloseStart();
  }

  onToggleNavDrawer(data: DrawerSatateData): void {
    if (data.rightDrawerState) {
      this.rightDrawerServiceService.setNavDrawerState(false);
    }
    this.navDrawerService.setNavDrawerState(!data.navDrawerState);
  }

  onToggleRightDrawer(data: RightDrawerStateData): void {
    if (data.navDrawerState) {
      this.navDrawerService.setNavDrawerState(false);
    }
    if (this.rightSidenavViewState === data.view) {
      this.rightDrawerServiceService.setNavDrawerState(!data.rightDrawerState);
    } else {
      this.rightDrawerServiceService.setNavDrawerState(true);
    }
    this.rightSidenavViewState = data.view;
  }

  initDrawerCloseStart(): void {
    this.navDrawer.closedStart.subscribe(() => {
      this.navDrawerService.setNavDrawerState(false);
    });
    this.rightDrawer.closedStart.subscribe(() => {
      this.rightDrawerServiceService.setNavDrawerState(false);
    });
  }
}
