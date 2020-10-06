import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PlantCatalogueItem } from '@pelaguru/interfaces';
import { PlantService } from '../../../core/plant-service/plant.service';

@Component({
  selector: 'pelaguru-plants-catalogue',
  templateUrl: './plants-catalogue.component.html',
  styleUrls: ['./plants-catalogue.component.scss'],
})
export class PlantsCatalogueComponent implements OnInit {
  private PlantCatalogueItemsDataSource: BehaviorSubject<
    Array<PlantCatalogueItem>
  > = new BehaviorSubject<Array<PlantCatalogueItem>>([]);
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  searchController: FormGroup;
  constructor(private plantService: PlantService) {
    this.searchController = new FormGroup({
      search: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    // this.addTestData();
    this.getAllPlants();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  async getAllPlants() {
    const plants = await this.plantService.getAllPlants();
    this.PlantCatalogueItemsDataSource.next(plants);
  }

  // addTestData(): void {
  //   this.plantCatalogueItemsDataSource.next([
  //     {
  //       id: '876543',
  //       image: '../../../assets/img/temp/1.jpg',
  //       name: 'Tomato',
  //       sciName: 'Lycopersicon esculentum',
  //       username: 'tomato',
  //     },
  //     {
  //       id: '876543',
  //       image: '../../../assets/img/temp/1.jpg',
  //       name: 'Tomato',
  //       sciName: 'Lycopersicon esculentum',
  //       username: 'tomato',
  //     },
  //     {
  //       id: '876543',
  //       image: '../../../assets/img/temp/1.jpg',
  //       name: 'Tomato',
  //       sciName: 'Lycopersicon esculentum',
  //       username: 'tomato',
  //     },
  //   ]);
  // }

  get plantCatalogueItems(): Observable<Array<PlantCatalogueItem>> {
    return this.PlantCatalogueItemsDataSource.asObservable();
  }
}
