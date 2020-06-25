import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Observable, merge, of as observableOf } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, switchMap, startWith, catchError } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

interface ProductData {
  name: string;
  id: string;
  views: number;
}

@Component({
  selector: 'pelaguru-popular-products',
  templateUrl: './popular-products.component.html',
  styleUrls: ['./popular-products.component.scss']
})
export class PopularProductsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'views'];
  dataSource: MatTableDataSource<ProductData> = new MatTableDataSource();
  tempdata: Array<ProductData> = [
    { id: '2435465768', name: 'Product 1', views: 34 },
    { id: '2435465768', name: 'Product 2', views: 67 },
    { id: '2435465768', name: 'Product 3', views: 54 },
    { id: '2435465768', name: 'Product 4', views: 12 },
    { id: '2435465768', name: 'Product 5', views: 98 },
    { id: '2435465768', name: 'Product 6', views: 34 },
    { id: '2435465768', name: 'Product 7', views: 65 }
  ];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  pageSize = 5;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    this.dataSource.data = this.tempdata;

    // merge(this.sort.sortChange, this.paginator.page)
    //   .pipe(
    //     startWith({}),
    //     switchMap(() => {
    //       this.isLoadingResults = true;
    //       // api call
    //     }),
    //     map(data => {
    //       this.isLoadingResults = false;
    //       this.isRateLimitReached = false;
    //       this.resultsLength = data.total_count;

    //       return data.items;
    //     }),
    //     catchError(() => {
    //       this.isLoadingResults = false;
    //       this.isRateLimitReached = true;
    //       return observableOf([]);
    //     })
    //   )
    //   .subscribe((data: any) => (this.dataSource = data));
  }
}
