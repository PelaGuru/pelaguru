import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'pelaguru-detail-chemical',
  templateUrl: './detail-chemical.component.html',
  styleUrls: ['./detail-chemical.component.scss'],
})
export class DetailChemicalComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log(this.router.url.split('/')[2]);
  }
}
