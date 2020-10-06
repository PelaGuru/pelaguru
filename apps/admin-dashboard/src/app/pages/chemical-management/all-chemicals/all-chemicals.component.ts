import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Chemical } from '@pelaguru/interfaces';
import { BehaviorSubject } from 'rxjs';
import { ChemicalService } from '../../../core/chemical-service/chemical.service';
import { NotificationService } from '../../../core/notification-service/notification.service';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.value) {
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
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
      }
    });
  }
}
