import { Component, OnInit } from '@angular/core';
import { PLANT } from './plant';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  ChemicalSuggestionItem,
  DiseaseCatalogueItem,
  PlantCatalogueItem,
} from '@pelaguru/interfaces';
import { FormGroup, FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { DiseaseService } from '../../../core/disease-service/disease.service';
import { Router } from '@angular/router';
import { PlantService } from '../../../core/plant-service/plant.service';

@Component({
  selector: 'pelaguru-view-plant',
  templateUrl: './view-plant.component.html',
  styleUrls: ['./view-plant.component.scss'],
})
export class ViewPlantComponent implements OnInit {
  private PlantDetailDataSource: BehaviorSubject<
    PlantCatalogueItem
  > = new BehaviorSubject<PlantCatalogueItem>(null);
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  searchController: FormGroup;
  constructor(private plantService: PlantService, private router: Router) {}
  plant = PLANT;

  ngOnInit(): void {
    this.getPlant();
  }
  async getPlant() {
    console.log('Doc id', this.router.url.split('/')[2]);
    const plant = await this.plantService.getPlant(
      this.router.url.split('/')[2]
    );
    this.PlantDetailDataSource.next(plant);
  }
}
