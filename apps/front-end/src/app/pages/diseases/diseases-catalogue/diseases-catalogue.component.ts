import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { DiseaseCatalogueItem } from '@pelaguru/interfaces';

@Component({
  selector: 'pelaguru-diseases-catalogue',
  templateUrl: './diseases-catalogue.component.html',
  styleUrls: ['./diseases-catalogue.component.scss'],
})
export class DiseasesCatalogueComponent implements OnInit {
  private DiseaseCatalogueItemsDataSource: BehaviorSubject<
    Array<DiseaseCatalogueItem>
  > = new BehaviorSubject<Array<DiseaseCatalogueItem>>([]);
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  searchController: FormGroup;
  constructor() {
    this.searchController = new FormGroup({
      search: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    this.addTestData();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  addTestData(): void {
    this.DiseaseCatalogueItemsDataSource.next([
      {
        id: '876543',
        image: 'http://localhost:4200/assets/img/temp/1.jpg',
        name: 'Tomato',
        sciName: 'Lycopersicon esculentum',
        username: 'tomato',
      },
      {
        id: '876543',
        image: 'http://localhost:4200/assets/img/temp/1.jpg',
        name: 'Tomato',
        sciName: 'Lycopersicon esculentum',
        username: 'tomato',
      },
      {
        id: '876543',
        image: 'http://localhost:4200/assets/img/temp/1.jpg',
        name: 'Tomato',
        sciName: 'Lycopersicon esculentum',
        username: 'tomato',
      },
    ]);
  }
  get diseaseCatalogueItems(): Observable<Array<DiseaseCatalogueItem>> {
    return this.DiseaseCatalogueItemsDataSource.asObservable();
  }
}
