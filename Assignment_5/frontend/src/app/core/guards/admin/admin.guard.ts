import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../../services/auth/auth.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  canActivate() {
    const user = this.authService.getCurrentUser();

    if (user && user.isAdmin) {
      return true;
    } else {
      this.router.navigate(['/']);
      // i.e. to /app/analytics
      return false;
    }
  }
}
