import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PageGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkAuthenticatedWithRedirect();
  }
  checkAuthenticatedWithRedirect() {
    return this.authService.isAuthenticated().pipe(
      map((authenticated) => {
        console.log(authenticated);

        return authenticated;
      }),
      tap((authenticated) => {
        if (!authenticated) {
          this.router.navigate(['/']);
        }
      })
    );
  }
}
