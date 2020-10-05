import { Component, OnInit } from '@angular/core';
import { DISEASE } from './diseases';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  ChemicalSuggestionItem,
  DiseaseCatalogueItem,
} from '@pelaguru/interfaces';
import { FormGroup, FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { DiseaseService } from '../../../core/disease-service/disease.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pelaguru-view-disease',
  templateUrl: './view-disease.component.html',
  styleUrls: ['./view-disease.component.scss'],
})
export class ViewDiseaseComponent implements OnInit {
  private chemicalItemsDataSource: BehaviorSubject<
    Array<ChemicalSuggestionItem>
  > = new BehaviorSubject<Array<ChemicalSuggestionItem>>([]);
  private diseaseDetailDataSource: BehaviorSubject<
    DiseaseCatalogueItem
  > = new BehaviorSubject<DiseaseCatalogueItem>(null);
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  searchController: FormGroup;
  constructor(private diseaseService: DiseaseService, private router: Router) {}
  // disease = DISEASE;

  ngOnInit(): void {
    this.getDisease();
    //this.addTestData();
    // console.log(this.router.url.split('/'));
  }
  async getDisease() {
    const disease = await this.diseaseService.getDisease(
      this.router.url.split('/')[2]
    );
    this.diseaseDetailDataSource.next(disease);
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
  get diseaseDetails(): Observable<DiseaseCatalogueItem> {
    return this.diseaseDetailDataSource.asObservable();
  }
  get chemicalSuggestionItems(): Observable<Array<ChemicalSuggestionItem>> {
    return this.chemicalItemsDataSource.asObservable();
  }
}
