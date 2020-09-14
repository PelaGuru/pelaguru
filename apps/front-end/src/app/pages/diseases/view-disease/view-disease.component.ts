import { Component, OnInit } from '@angular/core';
import { DISEASE } from './diseases';
import { Observable, BehaviorSubject } from 'rxjs';
import { ChemicalSuggestionItem } from '@pelaguru/interfaces';
import { FormGroup, FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'pelaguru-view-disease',
  templateUrl: './view-disease.component.html',
  styleUrls: ['./view-disease.component.scss'],
})
export class ViewDiseaseComponent implements OnInit {
  private chemicalItemsDataSource: BehaviorSubject<
    Array<ChemicalSuggestionItem>
  > = new BehaviorSubject<Array<ChemicalSuggestionItem>>([]);
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  searchController: FormGroup;
  constructor() {}
  disease = DISEASE;

  ngOnInit(): void {
    this.getDisease();
    this.addTestData();
  }
  getDisease(): void {
    //this.plantService.getPlant().subscribe(plant => this.plant = plant);
  }
  addTestData(): void {
    this.chemicalItemsDataSource.next([
      {
        brandName: 'Brand Name',
        chemicalName: 'Chemical Name',
        vendors: ['ABC Company'],
        avgPrice: 200,
        image: 'https://cdn.hirunews.lk/Data/News_Images/201304/56746.jpg',
      },
      {
        brandName: 'Brand Name',
        chemicalName: 'Chemical Name',
        vendors: ['ABC Company'],
        avgPrice: 200,
        image: 'https://cdn.hirunews.lk/Data/News_Images/201304/56746.jpg',
      },
      {
        brandName: 'Brand Name',
        chemicalName: 'Chemical Name',
        vendors: ['ABC Company'],
        avgPrice: 200,
        image: 'https://cdn.hirunews.lk/Data/News_Images/201304/56746.jpg',
      },
    ]);
  }

  get chemicalSuggestionItems(): Observable<Array<ChemicalSuggestionItem>> {
    return this.chemicalItemsDataSource.asObservable();
  }
}
