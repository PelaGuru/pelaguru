import { Component, OnInit, Input } from '@angular/core';
import { NavLinkData } from '../models/nav-link-data';

@Component({
  selector: 'pelaguru-right-drawer',
  templateUrl: './right-drawer.component.html',
  styleUrls: ['./right-drawer.component.scss']
})
export class RightDrawerComponent implements OnInit {
  @Input() viewState: string;
  profileLinks: Array<NavLinkData> = [{ label: 'Profile', link: '/profile' }];
  constructor() {}

  ngOnInit(): void {}
}
