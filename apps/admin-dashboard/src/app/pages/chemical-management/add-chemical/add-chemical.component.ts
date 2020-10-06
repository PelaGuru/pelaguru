import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChemicalService } from '../../../core/chemical-service/chemical.service';
import { NotificationService } from '../../../core/notification-service/notification.service';

@Component({
  selector: 'pelaguru-add-chemical',
  templateUrl: './add-chemical.component.html',
  styleUrls: ['./add-chemical.component.scss'],
})
export class AddChemicalComponent implements OnInit {
  loading: boolean;
  formControl: FormGroup;
  files: File[] = [];

  constructor(
    private chemicalService: ChemicalService,
    private notificationService: NotificationService
  ) {
    this.formControl = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  async addChemical() {
    if (this.formControl.valid) {
      if (this.files.length >= 1) {
        this.loading = true;
        const id = this.chemicalService.geneateId();
        console.log(id);

        this.chemicalService
          .uploadImage(this.files, id)
          .then((response) => {
            this.chemicalService
              .addChemical(
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
                  'Chemical successfully added.',
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
  }

  onRemove(event: any) {
    // console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
