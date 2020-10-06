import { Component, OnInit } from '@angular/core';
import { Plant } from '@pelaguru/interfaces';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from '../../../core/notification-service/notification.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup } from '@angular/forms';
import { PlantService } from '../../../core/plant-service/plant.service';

@Component({
  selector: 'pelaguru-all-plants',
  templateUrl: './all-plants.component.html',
  styleUrls: ['./all-plants.component.scss'],
})
export class AllPlantsComponent implements OnInit {
  loading = true;
  formControl: FormGroup;
  disease: BehaviorSubject<any> = new BehaviorSubject([]);
  displayedColumns: string[] = ['name', 'action'];
  plants: BehaviorSubject<Partial<Plant>[]> = new BehaviorSubject([]);
  constructor(
    private notificationService: NotificationService,
    private PlantService: PlantService
  ) {
    this.formControl = new FormGroup({ search: new FormControl('') });
  }

  ngOnInit(): void {
    this.getAllPlants();
  }

  deletePlant(id: string) {
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
        this.PlantService.deletePlant(id)
          .then(() => {
            this.loading = false;
            this.getAllPlants();
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

  async getAllPlants() {
    this.loading = true;
    this.PlantService.getAllPlants()
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
