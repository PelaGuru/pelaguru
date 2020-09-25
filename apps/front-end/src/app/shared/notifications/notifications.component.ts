import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pelaguru-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  @Input() title: string;
  constructor() {}

  ngOnInit(): void {}
}
