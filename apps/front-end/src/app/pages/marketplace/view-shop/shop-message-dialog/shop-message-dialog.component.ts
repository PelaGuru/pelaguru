import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../../../../../app/core/auth/auth.service';

@Component({
  selector: 'pelaguru-shop-message-dialog',
  templateUrl: './shop-message-dialog.component.html',
  styleUrls: ['./shop-message-dialog.component.scss'],
})
export class ShopMessageDialogComponent implements OnInit {
  formControl: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ShopMessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { shopId: string },
    private authService: AuthService
  ) {
    this.formControl = new FormGroup({
      message: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  async sendMessage() {
    this.authService.getUserStream().subscribe((resopnse) => {
      console.log(resopnse.userId);
    });
  }
}
