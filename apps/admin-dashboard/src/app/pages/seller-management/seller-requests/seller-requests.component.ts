import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface SellerRequests {
  displayName: string;
  email: string;
  createdAt: string;
}

@Component({
  selector: 'pelaguru-seller-requests',
  templateUrl: './seller-requests.component.html',
  styleUrls: ['./seller-requests.component.scss'],
})
export class SellerRequestsComponent implements OnInit {
  requests: BehaviorSubject<Partial<SellerRequests>[]> = new BehaviorSubject(
    []
  );
  displayedColumns: string[] = ['name', 'email', 'requested_at', 'action'];
  constructor() {}

  ngOnInit(): void {
    this.requests.next([
      {
        displayName: 'Nishan Wijethunga',
        email: 'n.sameerawijethunga@gmail.com',
        createdAt: '',
      },
    ]);
  }
}
