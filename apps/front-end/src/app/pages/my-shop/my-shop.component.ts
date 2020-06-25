import { Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'pelaguru-my-shop',
  templateUrl: './my-shop.component.html',
  styleUrls: ['./my-shop.component.scss']
})
export class MyShopComponent implements OnInit {
  mobileQuery: MediaQueryList;
  constructor(private mediaMatcher: MediaMatcher) {
    this.mobileQuery = mediaMatcher.matchMedia('(max-width: 820px)');
    // tslint:disable-next-line: deprecation
    // this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit(): void {}
}
