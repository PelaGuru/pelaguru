import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'pelaguru-diseases-catalogue',
  templateUrl: './diseases-catalogue.component.html',
  styleUrls: ['./diseases-catalogue.component.scss']
})
export class DiseasesCatalogueComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  searchController: FormGroup;
  constructor() {
    this.searchController = new FormGroup({
      search: new FormControl()
    });
  }

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(
      option => option.toLowerCase().indexOf(filterValue) === 0
    );
  }
}
