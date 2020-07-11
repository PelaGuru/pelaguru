import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pelaguru-user-review-item',
  templateUrl: './user-review-item.component.html',
  styleUrls: ['./user-review-item.component.scss']
})
export class UserReviewItemComponent implements OnInit {
  @Input() rating: number;
  @Input() name: string;
  @Input() description: string;
  constructor() {}

  ngOnInit(): void {}

  get ratingClass(): string {
    return `rate-${this.rating}`;
  }
}
