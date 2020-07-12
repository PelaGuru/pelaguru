import { Component, OnInit } from '@angular/core';
import { PLANT } from './plant';

@Component({
  selector: 'pelaguru-view-plant',
  templateUrl: './view-plant.component.html',
  styleUrls: ['./view-plant.component.scss']
})
export class ViewPlantComponent implements OnInit {
  constructor() {}
  plant = PLANT;

  ngOnInit(): void {
    this.getPlant();
  }

  getPlant(): void {
    //this.plantService.getPlant().subscribe(plant => this.plant = plant);
  }
}
