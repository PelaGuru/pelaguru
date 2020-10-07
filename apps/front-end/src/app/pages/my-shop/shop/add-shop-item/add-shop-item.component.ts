import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { DiseaseService } from '../../../../core/disease-service/disease.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../../../core/auth/auth.service';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { FirestoreOperation, Shop, ShopItem } from '@pelaguru/interfaces';
import * as firebase from 'firebase/app';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'pelaguru-add-shop-item',
  templateUrl: './add-shop-item.component.html',
  styleUrls: ['./add-shop-item.component.scss'],
})
export class AddShopItemComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  firstStepEditable = true;
  files: File[] = [];
  diseaseList: BehaviorSubject<
    {
      id: string;
      name: string;
    }[]
  > = new BehaviorSubject([]);

  constructor(
    private http: HttpClient,
    private diseaseService: DiseaseService,
    private fireStore: AngularFirestore,
    private authService: AuthService,
    private fireStorage: AngularFireStorage,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.firstFormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      ingredients: new FormControl('', Validators.required),
      note: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required]),
      diseases: new FormControl([], Validators.required),
    });
    this.getAllDiseases();
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  addItem() {
    if (this.firstFormGroup.valid) {
      console.log(this.firstFormGroup.get('diseases').value);
    }
  }

  async getAllDiseases() {
    const data = await this.diseaseService.getAllDiseases();
    if (data.length > 0) {
      this.diseaseList.next(
        data.map((d) => {
          return {
            id: d.id,
            name: d.diseaseName,
          } as {
            id: string;
            name: string;
          };
        })
      );
    }
  }

  async uploadImage(file: File, id: string, shopId: string) {
    const baseFilePath = `shopitems/${shopId}/${id}/`;
    // return await Promise.all(uploadEvents);
    const filePath = `${baseFilePath}/${new Date().getTime()}_${file.name}`;
    const fileRef = this.fireStorage.ref(filePath);
    const task = this.fireStorage.upload(filePath, file);
    // tslint:disable-next-line: deprecation
    const url = await forkJoin(task.snapshotChanges())
      .pipe(
        mergeMap(() => fileRef.getDownloadURL()),
        // tslint:disable-next-line: no-shadowed-variable
        map((url) => url as string)
      )
      .toPromise();
    return url;
  }

  addShopItem() {
    if (this.firstFormGroup.valid) {
      this.authService.getUserStream().pipe(
        switchMap(async (response) => {
          const data = await this.fireStore.firestore
            .collection('Shops')
            .where('vendorId', '==', response.userId)
            .get();
          const shopId = (data.docs[0].data() as Shop).id;
          const addId = this.fireStore.createId();
          const addRef = this.fireStore
            .collection('Shops')
            .doc(shopId)
            .collection('items')
            .doc(addId);
          const url = await this.uploadImage(this.files[0], addId, shopId);
          const itemData: FirestoreOperation<ShopItem> = {
            id: addId,
            name: this.firstFormGroup.get('name').value,
            description: this.firstFormGroup.get('description').value,
            diseases: this.firstFormGroup.get('diseases').value,
            ingredients: this.firstFormGroup.get('ingredients').value,
            note: this.firstFormGroup.get('note').value,
            price: this.firstFormGroup.get('price').value,
            shopId,
            image: url,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          };
          addRef.set(itemData).then(() => {
            this.snackbar.open('Shop item successfully added.');
          });
        })
      ).subscribe();
    }
  }
}
