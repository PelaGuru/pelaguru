import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'pelaguru-diseases-identifier',
  templateUrl: './diseases-identifier.component.html',
  styleUrls: ['./diseases-identifier.component.scss']
})
export class DiseasesIdentifierComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  title = 'dropzone';
  files: File[] = [];
  constructor(private _formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
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

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
