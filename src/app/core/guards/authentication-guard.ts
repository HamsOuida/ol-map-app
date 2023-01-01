import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const rememberMe = localStorage.getItem('rememberMe');
    if (localStorage.getItem('token') || rememberMe) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
