import { Component, OnInit, Input } from '@angular/core';
import { RouteArray, routeData } from './route.data';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'pelaguru-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  @Input() id = '';
  @Input() data = '';
  BREADCRUMBS: BehaviorSubject<RouteArray> = new BehaviorSubject<RouteArray>(
    []
  );
  routeData = routeData;
  constructor() {}

  ngOnInit(): void {
    if (this.id) {
      this.BREADCRUMBS.next(
        this.routeData.find((d) => d.id === this.id).routes
      );
    } else if (this.data) {
      try {
        this.BREADCRUMBS.next(JSON.parse(this.data));
      } catch (error) {
        console.log('Breadcrumb Error :: ', error);
      }
    }
  }
}
