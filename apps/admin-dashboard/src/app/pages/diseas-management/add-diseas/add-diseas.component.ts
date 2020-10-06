import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../../core/notification-service/notification.service';
import { DiseasService } from '../../../core/diseas-service/diseas.service';

@Component({
  selector: 'pelaguru-add-diseas',
  templateUrl: './add-diseas.component.html',
  styleUrls: ['./add-diseas.component.scss'],
})
export class AddDiseasComponent implements OnInit {
  loading = false;
  formControl: FormGroup;
  catControl: FormGroup;
  additionalFeatures: string[] = [];
  commonPlants: string[] = [];
  commonSymptoms: string[] = [];
  solutions: string[] = [];
  images: File[] = [];
  constructor(
    private notificationService: NotificationService,
    private diseasService: DiseasService
  ) {
    this.formControl = new FormGroup({
      diseaseName: new FormControl('', Validators.required),
      causes: new FormControl('', Validators.required),
    });
    this.catControl = new FormGroup({
      additionalFeature: new FormControl('', Validators.required),
      commonPlant: new FormControl('', Validators.required),
      commonSymptoms: new FormControl('', Validators.required),
      solutions: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  addDisease() {}

  addPossibleCause() {
    if (this.catControl.get('additionalFeature').valid) {
      this.additionalFeatures.push(
        this.catControl.get('additionalFeature').value
      );
      this.catControl.get('additionalFeature').reset();
    }
  }

  removeAdditionalFeature(index: number) {
    this.additionalFeatures.splice(index, 1);
  }

  addCommonPlant() {
    if (this.catControl.get('commonPlant').valid) {
      this.commonPlants.push(this.catControl.get('commonPlant').value);
      this.catControl.get('commonPlant').reset();
    }
  }

  addCommonSymptom() {
    if (this.catControl.get('commonSymptoms').valid) {
      this.commonSymptoms.push(this.catControl.get('commonSymptoms').value);
      this.catControl.get('commonSymptoms').reset();
    }
  }

  addSolutions() {
    if (this.catControl.get('solutions').valid) {
      this.solutions.push(this.catControl.get('solutions').value);
      this.catControl.get('solutions').reset();
    }
  }

  removeCommonPlant(index: number) {
    this.commonPlants.splice(index, 1);
  }

  removeCommonSymptom(index: number) {
    this.commonSymptoms.splice(index, 1);
  }

  removeSolutions(index: number) {
    this.solutions.splice(index, 1);
  }

  onSelect(event: any) {
    // console.log(event);
    this.images.push(...event.addedFiles);
  }

  onRemove(event: any) {
    // console.log(event);
    this.images.splice(this.images.indexOf(event), 1);
  }

  async addDiseas() {
    if (this.formControl.valid) {
      if (this.additionalFeatures.length < 1) {
        this.notificationService.create(
          'Additional features cannot be empty.',
          'danger',
          'Error'
        );
      } else if (this.commonPlants.length < 1) {
        this.notificationService.create(
          'Common plants cannot be empty.',
          'danger',
          'Error'
        );
      } else if (this.solutions.length < 1) {
        this.notificationService.create(
          'Solutions cannot be empty.',
          'danger',
          'Error'
        );
      } else if (this.commonSymptoms.length < 1) {
        this.notificationService.create(
          'Common symptoms cannot be empty.',
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
        this.loading = true;
        const id = this.diseasService.geneateId();
        this.diseasService
          .uploadImage(this.images[0], id)
          .then((response) => {
            this.diseasService
              .addDiseas({
                id,
                causes: this.formControl.get('causes').value,
                diseaseName: this.formControl.get('diseaseName').value,
                additionalFeatures: this.additionalFeatures,
                commonPlants: this.commonPlants,
                commonSymptoms: this.commonSymptoms,
                solutions: this.solutions,
                image: response,
              })
              .then(() => {
                this.loading = false;
                this.additionalFeatures = [];
                this.commonPlants = [];
                this.commonSymptoms = [];
                this.solutions = [];
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

/**
 *   
  id: string;
  name: string;
  additionalFeatures: string[];
  commonPlants: string[];
  description: string;
  images: Image[];
 * 
 */
