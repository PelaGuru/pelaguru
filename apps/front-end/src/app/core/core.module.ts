import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { RightDrawerServiceService } from './right-drawer-service/right-drawer-service.service';
import { NavDrawerService } from './nav-drawer-service/nav-drawer.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule
  ],
  providers: [RightDrawerServiceService, NavDrawerService]
})
export class CoreModule {}
