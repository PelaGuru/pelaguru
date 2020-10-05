import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChemicalService } from '../../../core/chemical-service/chemical.service';
import { NotificationService } from '../../../core/notification-service/notification.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'pelaguru-edit-chemical',
  templateUrl: './edit-chemical.component.html',
  styleUrls: ['./edit-chemical.component.scss'],
})
export class EditChemicalComponent implements OnInit {
  loading: boolean;
  formControl: FormGroup;
  files: File[] = [];
  editedBool: boolean = false;

  constructor(
    private fireStore: AngularFirestore,
    private router: Router,
    private chemicalService: ChemicalService,
    private notificationService: NotificationService
  ) {
    this.formControl = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  async ngOnInit() {
    const cityRef = this.fireStore
      .collection('Chemicals')
      .doc(this.router.url.split('/')[2]);
    const doc = await cityRef.get().toPromise();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      this.formControl.get('name').setValue(doc.data().name);
      this.formControl.get('description').setValue(doc.data().description);
      this.files = doc.data().images;
    }
  }

  async editChemical() {
    if (this.formControl.valid) {
      if (this.files.length >= 1) {
        this.loading = true;
        const id = this.router.url.split('/')[2];
        console.log(id);
        if (this.editedBool) {
          this.chemicalService
            .uploadImage(this.files, id)
            .then((response) => {
              this.chemicalService
                .editChemical(
                  id,
                  this.formControl.get('name').value,
                  this.formControl.get('description').value,
                  response
                )
                .then(() => {
                  this.loading = false;
                  this.formControl.reset();
                  this.files = [];
                  this.notificationService.create(
                    'Chemical successfully edited.',
                    'success',
                    'Success'
                  );
                  this.router.navigate(['/chemicals/all']);
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
        } else {
          this.chemicalService
            .editChemicalWithoutImageUpdate(
              id,
              this.formControl.get('name').value,
              this.formControl.get('description').value
            )
            .then(() => {
              this.loading = false;
              this.formControl.reset();
              this.files = [];
              this.notificationService.create(
                'Chemical successfully edited.',
                'success',
                'Success'
              );
              this.router.navigate(['/chemicals/all']);
            })
            .catch((error) => {
              this.loading = false;
              this.notificationService.create(
                'Something went wrong. Try again later.',
                'danger',
                'Error'
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
      } else {
        this.notificationService.create(
          'Images cannot be empty.',
          'danger',
          'Error'
        );
      }
    }
  }

  onSelect(event: any) {
    // console.log(event);
    this.files.push(...event.addedFiles);
    this.editedBool = true;
  }

  onRemove(event: any) {
    // console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  // async updateClicked() {
  //   const cityRef = this.fireStore.collection('Chemicals').doc(this.id);
  //   const res = await cityRef.update({ name: this.name , description: this.description , images:[{url:this.imageToShow}] });
  // }
}
