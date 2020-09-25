import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pelaguru-btn-loading',
  templateUrl: './btn-loading.component.html',
  styleUrls: ['./btn-loading.component.scss'],
})
export class BtnLoadingComponent implements OnInit {
  @Input() color: string;
  constructor() {}

  ngOnInit(): void {}
}
