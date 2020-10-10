import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'pelaguru-not-authorized',
  templateUrl: './not-authorized.component.html',
  styleUrls: ['./not-authorized.component.scss'],
})
export class NotAuthorizedComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  logOut() {
    this.authService
      .logout()
      .toPromise()
      .then(() => {
        this.router.navigate(['/sign-in']);
      });
  }
}
