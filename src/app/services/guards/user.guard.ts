import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private auth: AuthService, private route: Router) {}
  canActivate(): Observable<boolean> {
    return this.auth.currentUser$.pipe(
      map((user) => {
        if (!user?.roles?.includes('ROLE_USER')) {
          this.route.navigate(['accessdenied']);
          return false;
        }

        return true;
      })
    );
  }
}
