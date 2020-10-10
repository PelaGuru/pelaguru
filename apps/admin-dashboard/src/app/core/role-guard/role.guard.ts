import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.getUserStream().pipe(
      take(1),
      map((user) => {
        if (!user) {
          throw new Error(
            'User is not logged in. Always include the role guard followed by an auth guard.'
          );
        }
        const allowedRoles: string[] = next.data.allowedRoles || [];
        return allowedRoles.filter((r) => r === user.role).length > 0;
      }),
      tap((allowed) => {
        if (!allowed) {
          console.log('NOT allowed');
          this.router.navigate(['/unauthorized']);
        }
      })
    );
  }
}
