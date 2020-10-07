import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { DiseasIdentifierService } from '../../core/diseas-identifier-service/diseas-identifier.service';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DiseaseCatalogueItem } from '@pelaguru/interfaces';
import { DiseaseService } from '../../core/disease-service/disease.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'pelaguru-diseases-identifier',
  templateUrl: './diseases-identifier.component.html',
  styleUrls: ['./diseases-identifier.component.scss'],
})
export class DiseasesIdentifierComponent implements OnInit {
  private diseaseDetailDataSource: BehaviorSubject<
    DiseaseCatalogueItem
  > = new BehaviorSubject<DiseaseCatalogueItem>(null);

  firstStepEditable = true;
  secondStepEditable = true;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  files: File[] = [];
  @ViewChild('stepper') stepper: MatStepper;

  constructor(
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    private fireStore: AngularFirestore,
    private fireStorage: AngularFireStorage,
    private spinner: NgxSpinnerService,
    private diseasIdentifierService: DiseasIdentifierService,
    private snackbar: MatSnackBar,
    private diseaseService: DiseaseService
  ) {}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: [false, [Validators.required, Validators.requiredTrue]],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: [false, [Validators.required, Validators.requiredTrue]],
    });
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }

  async onUploadClick() {
    this.spinner.show();
    const filePath = `uploadImages/${new Date().getTime()}_${
      this.files[0].name
    }`;
    const fileRef = this.fireStorage.ref(filePath);
    const task = this.fireStorage.upload(filePath, this.files[0]);
    // tslint:disable-next-line: deprecation
    forkJoin(task.snapshotChanges())
      .pipe(
        mergeMap(() => fileRef.getDownloadURL()),
        // tslint:disable-next-line: no-shadowed-variable
        map((url) => url as string)
      )
      .toPromise()
      .then((url) => {
        this.spinner.hide();
        this.firstFormGroup.get('firstCtrl').setValue(true);
        this.stepper.next();
        this.firstStepEditable = false;
        this.writeToFirestore(url, filePath);
        this.onPredict(url);
      })
      .catch((error) => {
        console.log(error);
        this.snackbar.open('Something went wrong. Try again later.', 'close');
      });
  }

  async writeToFirestore(url: string, path: string) {
    try {
      const data = {
        timestamp: new Date(),
        url: url,
        path: path,
      };
      return await this.fireStore.collection('uploadedImages').add(data);
    } catch (error) {
      console.log(error);
    }
  }

  onPredict(url: string) {
    try {
      this.diseasIdentifierService
        .getPrediction(url)
        .then((response) => {
          console.log(response);

          this.getDiseas(response?.predicted_result);

          if (Number.parseFloat(response.value) < 10) {
            Swal.fire({
              title: 'Attention!',
              text: 'Prediction rate is low. Continue with your own risk.',
              icon: 'warning',
              cancelButtonText: 'Ok',
            });
          } else {
            Swal.fire({
              title: 'Attention!',
              text: 'Prediction rate is 75%',
              icon: 'success',
              cancelButtonText: 'Ok',
            });
          }
        })
        .catch((error) => {
          console.log(error);
          this.snackbar.open('Something went wrong. Try again later.', 'close');
        });
    } catch (error) {
      console.log(error);
      this.snackbar.open('Something went wrong. Try again later.', 'close');
    }
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  async getDiseas(id: string) {
    try {
      if (id) {
        this.diseaseService.getDisease(id).then((response) => {
          if (response) {
            this.diseaseDetailDataSource.next(response);
            this.secondFormGroup.get('secondCtrl').setValue(true);
            this.stepper.next();
            this.secondStepEditable = false;
          } else {
            this.snackbar.open(
              'Something went wrong. Try again later.',
              'close'
            );
          }
        });
      } else {
        this.snackbar.open('Something went wrong. Try again later.', 'close');
      }
    } catch (error) {
      this.snackbar.open('Something went wrong. Try again later.', 'close');
    }
  }
  get diseaseDetails(): Observable<DiseaseCatalogueItem> {
    return this.diseaseDetailDataSource.asObservable();
  }
}
