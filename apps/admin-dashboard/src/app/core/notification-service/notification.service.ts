import { Injectable } from '@angular/core';
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbToastrService,
} from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: NbToastrService) {}

  create(message: string, status: NbComponentStatus = 'primary', title = '') {
    this.toastr.show(message, title, {
      status,
      hasIcon: false,
      position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
      duration: 10000,
      destroyByClick: true,
    });
  }
}
