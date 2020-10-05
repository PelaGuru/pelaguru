import { Component, OnInit } from '@angular/core';
import { Plant } from '@pelaguru/interfaces';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'pelaguru-all-plants',
  templateUrl: './all-plants.component.html',
  styleUrls: ['./all-plants.component.scss'],
})
export class AllPlantsComponent implements OnInit {
  plants: BehaviorSubject<Partial<Plant>[]> = new BehaviorSubject([]);
  displayedColumns: string[] = ['name', 'action'];
  constructor() {}

  ngOnInit(): void {
    this.plants.next([{ name: 'plant One' }]);
  }
}
