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
import { AuthModule } from './auth/auth.module';
import { PageGuard } from './page-guard/page.guard';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    AuthModule,
  ],
  exports: [AuthModule],
  providers: [RightDrawerServiceService, NavDrawerService, PageGuard],
})
export class CoreModule {}
