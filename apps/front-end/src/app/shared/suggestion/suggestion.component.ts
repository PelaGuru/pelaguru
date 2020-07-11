import { CHEMICAL } from './chemical';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pelaguru-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent implements OnInit {
  constructor() {}
  chemical = CHEMICAL;

  ngOnInit(): void {
    this.getChemical();
  }
  getChemical(): void {
    //this.plantService.getPlant().subscribe(plant => this.plant = plant);
  }
}
