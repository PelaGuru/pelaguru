import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
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
  file: File;
  constructor(
    private _formBuilder: FormBuilder,
    private http: HttpClient,
    private fireStore: AngularFirestore,
    private fireStorage: AngularFireStorage
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
    this.file = event.addedFiles;

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
    const filePath = `path`;
    const fileRef = this.fireStorage.ref(filePath);
    const task = this.fireStorage.upload(filePath, this.file);
    // tslint:disable-next-line: deprecation
    const url = await forkJoin(task.snapshotChanges())
      .pipe(
        mergeMap(() => fileRef.getDownloadURL()),
        // tslint:disable-next-line: no-shadowed-variable
        map((url) => url as string)
      )
      .toPromise();
  }

  onRemove() {
    // console.log(event);
    // this.files.splice(this.files.indexOf(event), 1);
    this.file = null;
  }
}
