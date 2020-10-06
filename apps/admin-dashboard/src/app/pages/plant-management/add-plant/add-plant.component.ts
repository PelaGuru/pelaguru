import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlantService } from '../../../core/plant-service/plant.service';
import { NotificationService } from '../../../core/notification-service/notification.service';

@Component({
  selector: 'pelaguru-add-plant',
  templateUrl: './add-plant.component.html',
  styleUrls: ['./add-plant.component.scss'],
})
export class AddPlantComponent implements OnInit {
  loading = false;
  formControl: FormGroup;
  catControl: FormGroup;
  commonDiseases: string[] = [];
  uses: string[] = [];
  commonSymptoms: string[] = [];
  images: File[] = [];
  constructor(
    private notificationService: NotificationService,
    private PlantService: PlantService
  ) {
    this.formControl = new FormGroup({
      description: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
    });
    this.catControl = new FormGroup({
      additionalFeature: new FormControl('', Validators.required),
      commonPlant: new FormControl('', Validators.required),
      commonSymptoms: new FormControl('', Validators.required),
      uses: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  addDisease() {}

  addCommonSymptom() {
    if (this.catControl.get('commonSymptoms').valid) {
      this.commonSymptoms.push(this.catControl.get('commonSymptoms').value);
      this.catControl.get('commonSymptoms').reset();
    }
  }

  addUses() {
    if (this.catControl.get('uses').valid) {
      this.uses.push(this.catControl.get('uses').value);
      this.catControl.get('uses').reset();
    }
  }
  removeCommonSymptom(index: number) {
    this.commonSymptoms.splice(index, 1);
  }

  removeUses(index: number) {
    this.uses.splice(index, 1);
  }

  onSelect(event: any) {
    // console.log(event);
    this.images.push(...event.addedFiles);
  }

  onRemove(event: any) {
    // console.log(event);
    this.images.splice(this.images.indexOf(event), 1);
  }

  async addPlant() {
    if (this.formControl.valid) {
      if (this.uses.length < 1) {
        this.notificationService.create(
          'uses cannot be empty.',
          'danger',
          'Error'
        );
      } else if (this.images.length < 1) {
        this.notificationService.create(
          'Images cannot be empty.',
          'danger',
          'Error'
        );
      } else {
        console.log(this.formControl.get('name').value);
        console.log(this.formControl.get('description').value);
        console.log(this.uses);
        console.log(this.images[0]);

        this.loading = true;
        const id = this.PlantService.geneateId();
        this.PlantService.uploadImage(this.images[0], id)
          .then((response) => {
            this.PlantService.addPlant(
              id,
              this.formControl.get('name').value,
              this.formControl.get('description').value,
              this.commonDiseases,
              this.uses,
              response
            )
              .then(() => {
                this.loading = false;
                this.commonDiseases = [];
                this.uses = [];
                this.images = [];
                this.formControl.reset();
                this.notificationService.create(
                  'Diseas successfully added.',
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
  }
}
