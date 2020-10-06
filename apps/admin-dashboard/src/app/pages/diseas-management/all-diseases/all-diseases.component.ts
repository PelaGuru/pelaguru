import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Disease } from '@pelaguru/interfaces';
import { BehaviorSubject } from 'rxjs';
import { DiseasService } from '../../../core/diseas-service/diseas.service';
import { NotificationService } from '../../../core/notification-service/notification.service';
import Swal from 'sweetalert2';

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

  constructor(
    private diseasService: DiseasService,
    private notificationService: NotificationService
  ) {
    this.formControl = new FormGroup({
      search: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getAllDiseases();
  }

  deleteDisease(id: string) {
    console.log(id);
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
        this.diseasService
          .deleteDiseases(id)
          .then(() => {
            this.loading = false;
            this.getAllDiseases();
            this.notificationService.create(
              'Diseases successfully deleted.',
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
