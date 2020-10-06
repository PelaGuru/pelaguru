import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../../core/notification-service/notification.service';
import { PlantService } from '../../../core/plant-service/plant.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'pelaguru-edit-plant',
  templateUrl: './edit-plant.component.html',
  styleUrls: ['./edit-plant.component.scss'],
})
export class EditPlantComponent implements OnInit {
  selectImageBool = false;
  loading = false;
  formControl: FormGroup;
  catControl: FormGroup;
  commonplantes: string[] = [];
  uses: string[] = [];
  commonSymptoms: string[] = [];
  images: File[] = [];
  constructor(
    private fireStore: AngularFirestore,
    private notificationService: NotificationService,
    private plantService: PlantService,
    private router: Router
  ) {
    this.formControl = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
    this.catControl = new FormGroup({
      uses: new FormControl('', Validators.required),
    });
  }

  async ngOnInit() {
    const cityRef = this.fireStore
      .collection('Plants')
      .doc(this.router.url.split('/')[2]);
    const doc = await cityRef.get().toPromise();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      this.formControl.get('name').setValue(doc.data().plantName),
        this.formControl.get('description').setValue(doc.data().scientificName),
        (this.uses = doc.data()?.uses),
        (this.images[0] = doc.data()?.image);
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
  onSelect(event: any) {
    // console.log(event);
    this.images.push(...event.addedFiles);
    this.selectImageBool = true;
  }

  onRemove(event: any) {
    // console.log(event);
    this.images.splice(this.images.indexOf(event), 1);
  }

  removeUses(index: number) {
    this.uses.splice(index, 1);
  }

  async editplant() {
    if (this.formControl.valid) {
      if (this.images.length < 1) {
        this.notificationService.create(
          'Images cannot be empty.',
          'danger',
          'Error'
        );
      } else if (this.selectImageBool) {
        this.selectImageBool = false;
        this.loading = true;
        const id = this.router.url.split('/')[2];
        this.plantService
          .uploadImage(this.images[0], id)
          .then((response) => {
            console.log(response);
            this.plantService
              .editPlant(
                id,
                this.formControl.get('name').value,
                this.formControl.get('description').value,
                this.uses,
                response
              )
              .then(() => {
                this.loading = false;
                this.commonSymptoms = [];
                this.images = [];
                this.formControl.reset();
                this.notificationService.create(
                  'plant successfully edited.',
                  'success',
                  'Success'
                );
                this.router.navigate(['/plants/all']);
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
      } else if (!this.selectImageBool) {
        this.loading = true;
        const id = this.router.url.split('/')[2];
        // this.plantService
        //   .uploadImage(this.images[0], id)
        //   .then((response) => {
        this.plantService
          .editPlantWithoutImageUpdate(
            id,
            this.formControl.get('name').value,
            this.formControl.get('description').value,
            this.uses
          )
          .then(() => {
            this.loading = false;
            this.images = [];
            this.formControl.reset();
            this.notificationService.create(
              'plant successfully added.',
              'success',
              'Success'
            );
            this.router.navigate(['/plants/all']);
          })
          .catch((error) => {
            this.loading = false;
            this.notificationService.create(
              'Something went wrong. Try again later.',
              'danger',
              'Error'
            );
          });
        // })
        // .catch((error) => {
        //   this.loading = false;
        //   this.notificationService.create(
        //     'Something went wrong. Try again later.',
        //     'danger',
        //     'Error'
        //   );
        // });
      } else {
        this.notificationService.create(
          'Something went wrong. Try again later.',
          'danger',
          'Error'
        );
      }
    }
  }
}
