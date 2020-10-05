import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserRole } from '@pelaguru/interfaces';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../../../core/user-service/user.service';

interface Sellers {
  displayName: string;
  email: string;
}

@Component({
  selector: 'pelaguru-all-sellers',
  templateUrl: './all-sellers.component.html',
  styleUrls: ['./all-sellers.component.scss'],
})
export class AllSellersComponent implements OnInit {
  loading = true;
  formControl: FormGroup;
  vendors: BehaviorSubject<Partial<Sellers>[]> = new BehaviorSubject([]);
  displayedColumns: string[] = ['name', 'email', 'action'];

  constructor(private userService: UserService) {
    this.formControl = new FormGroup({
      search: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getAllVendors();
  }

  async getAllVendors() {
    this.loading = true;
    this.userService.getUsersByRole(UserRole.Vendor).then((data) => {
      this.loading = false;
      this.vendors.next(data);
    });
  }
}
