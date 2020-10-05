import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Chemical } from '@pelaguru/interfaces';
import { BehaviorSubject } from 'rxjs';
import { ChemicalService } from '../../../core/chemical-service/chemical.service';
import { NotificationService } from '../../../core/notification-service/notification.service';

@Component({
  selector: 'pelaguru-all-chemicals',
  templateUrl: './all-chemicals.component.html',
  styleUrls: ['./all-chemicals.component.scss'],
})
export class AllChemicalsComponent implements OnInit {
  formControl: FormGroup;
  loading = true;
  chemical: BehaviorSubject<Chemical[]> = new BehaviorSubject([]);
  displayedColumns: string[] = ['name', 'action'];

  constructor(
    private chemicalService: ChemicalService,
    private notificationService: NotificationService
  ) {
    this.formControl = new FormGroup({
      search: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getAllChemicals();
  }

  async getAllChemicals() {
    this.chemicalService
      .getAllChemicals()
      .then((data) => {
        this.loading = false;
        this.chemical.next(data);
      })
      .catch((error) => {
        this.chemical.next([]);
      });
  }

  deleteChemical(id: string) {
    this.loading = true;
    this.chemicalService
      .deleteChamical(id)
      .then(() => {
        this.loading = false;
        this.getAllChemicals();
        this.notificationService.create(
          'Chemical successfully deleted.',
          'success',
          'Success'
        );
      })
      .catch((error) => {
        this.loading = false;
        this.notificationService.create(
          'Something went wrong. Try again later.',
          'danger',
          'Error'
        );
      });
  }
}
