import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
    const rolesRequeridos = route.data['roles'] as string[];
    if (rolesRequeridos?.length > 0) {
      const userRol = this.authService.getCurrentUser()?.rol;
      if (!userRol || !rolesRequeridos.includes(userRol)) {
        this.router.navigate(['/libros']);
        return false;
      }
    }
    return true;
  }
}
