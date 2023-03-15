import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    const userType = this.authService.getUserType();
    if (userType === 'customer') {
      return true; // user is authorized to access customer dashboard
    } else {
      this.router.navigate(['/login']); // redirect to login page if not authorized
      return false;
    }
  }
  
}
