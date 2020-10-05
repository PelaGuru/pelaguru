import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'pelaguru-diseases-identifier',
  templateUrl: './diseases-identifier.component.html',
  styleUrls: ['./diseases-identifier.component.scss'],
})
export class DiseasesIdentifierComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  title = 'dropzone';
  uploadedURL = '';
  files: File[] = [];
  constructor(
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    private fireStore: AngularFirestore,
    private fireStorage: AngularFireStorage,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);

    // const formData = new FormData();

    // for (let i = 0; i < this.files.length; i++) {
    //   formData.append("file[]", this.files[i]);
    // }

    // this.http.post('http://localhost:8001/upload.php', formData)
    // .subscribe(res => {
    //    console.log(res);
    //    alert('Uploaded Successfully.');
    // })
  }

  async onUploadClick() {
    this.spinner.show();
    const filePath = `uploadImages/${new Date().getTime()}_${
      this.files[0].name
    }`;

    const fileRef = this.fireStorage.ref(filePath);
    const task = this.fireStorage.upload(filePath, this.files[0]);
    // tslint:disable-next-line: deprecation
    const url = await forkJoin(task.snapshotChanges())
      .pipe(
        mergeMap(() => fileRef.getDownloadURL()),
        // tslint:disable-next-line: no-shadowed-variable
        map((url) => url as string)
      )
      .toPromise();
    this.spinner.hide();
    this.uploadedURL = url;
    console.log(url);
    this.writeToFirestore(url, filePath);
  }

  async writeToFirestore(url, path) {
    let data = {
      timestamp: new Date(),
      url: url,
      path: path,
    };
    return new Promise<any>((resolve, reject) => {
      this.fireStore
        .collection('uploadedImages')
        .add(data)
        .then(
          (res) => {},
          (err) => reject(err)
        );
    });
  }

  async onPredict() {
    console.log(this.uploadedURL);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
