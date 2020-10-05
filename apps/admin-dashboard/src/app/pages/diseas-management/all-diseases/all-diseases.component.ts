import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Disease } from '@pelaguru/interfaces';
import { BehaviorSubject } from 'rxjs';
import { DiseasService } from '../../../core/diseas-service/diseas.service';

@Component({
  selector: 'pelaguru-all-diseases',
  templateUrl: './all-diseases.component.html',
  styleUrls: ['./all-diseases.component.scss'],
})
export class AllDiseasesComponent implements OnInit {
  loading = true;
  formControl: FormGroup;
  disease: BehaviorSubject<Disease[]> = new BehaviorSubject([]);
  displayedColumns: string[] = ['name', 'action'];

  constructor(private diseasService: DiseasService) {
    this.formControl = new FormGroup({
      search: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getAllDiseases();
  }

  deleteDisease(id: string) {}

  async getAllDiseases() {
    this.loading = true;
    this.diseasService
      .getAllDiseases()
      .then((data) => {
        this.loading = false;
        this.loading = false;
        this.disease.next(data);
      })
      .catch((error) => {
        this.loading = false;
        this.disease.next([]);
      });
  }
}
