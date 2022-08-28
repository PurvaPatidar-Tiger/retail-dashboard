import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthenticationService } from '../../services/auth/auth.service';
import { NotificationService } from '../../services/notification/notification.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthenticationService
  ) {}

  canActivate() {
    const user = this.authService.getCurrentUser();
    if (user && user.expiration) {
      if (Date.now() < Date.parse(user.expiration)) {
        return true;
      } else {

        this.notificationService.openSnackBar('Your session has expired');
        this.router.navigate(['auth/signin']);
        return false;
      }
    }

    this.router.navigate(['auth/signin']);
    return false;
  }
}
