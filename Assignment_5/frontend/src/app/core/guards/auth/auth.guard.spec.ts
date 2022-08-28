import { AuthGuard } from './auth.guard';
//import * as moment from 'moment';
import { addDays, addMinutes, addSeconds } from 'date-fns';
import { AuthenticationService } from '../../services/auth/auth.service';
import { NotificationService } from '../../services/notification/notification.service';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let router: Router;
  let authService: AuthenticationService;
  let notificationService: NotificationService;

  beforeEach(() => {
    router = jasmine.createSpyObj(['navigate']);
    authService = jasmine.createSpyObj(['getCurrentUser']);
    notificationService = jasmine.createSpyObj(['openSnackBar']);
  });

  it('create an instance', () => {
    const guard = new AuthGuard(router, notificationService, authService);
    expect(guard).toBeTruthy();
  });

  it('returns false if user is null', () => {
    // authService.getCurrentUser.and.returnValue(null);
    authService.getCurrentUser = jasmine.createSpy().and.returnValue(null);
    const guard = new AuthGuard(router, notificationService, authService);

    const result = guard.canActivate();

    expect(result).toBe(false);
    //expect(result).toBeFalse();
  });

  it('redirects to login if user is null', () => {
    // authService.getCurrentUser.and.returnValue(null);
    authService.getCurrentUser = jasmine.createSpy().and.returnValue(null);
    const guard = new AuthGuard(router, notificationService, authService);

    guard.canActivate();

    expect(router.navigate).toHaveBeenCalledWith(['auth/signin']);
  });

  it('does not display expired notification if user is null', () => {
    // authService.getCurrentUser.and.returnValue(null);
    authService.getCurrentUser = jasmine.createSpy().and.returnValue(null);
    const guard = new AuthGuard(router, notificationService, authService);

    guard.canActivate();

    expect(notificationService.openSnackBar).toHaveBeenCalledTimes(0);
  });

  it('redirects to login if user session has expired', () => {
    const user = {
      expiration: addMinutes(Date.now(), -1),
    }; //moment().add(-1, 'minutes') };
    // authService.getCurrentUser.and.returnValue(user);
    authService.getCurrentUser = jasmine.createSpy().and.returnValue(user);
    const guard = new AuthGuard(router, notificationService, authService);

    guard.canActivate();

    expect(router.navigate).toHaveBeenCalledWith(['auth/signin']);
  });

  it('displays notification if user session has expired', () => {
    const user = {
      expiration: addSeconds(Date.now(), -1),
      //moment().add(-1, 'seconds')
    };
    // authService.getCurrentUser.and.returnValue(user);
    authService.getCurrentUser = jasmine.createSpy().and.returnValue(user);
    const guard = new AuthGuard(router, notificationService, authService);

    guard.canActivate();

    expect(notificationService.openSnackBar).toHaveBeenCalledWith(
      'Your session has expired'
    );
  });

  it('returns true if user session is valid', () => {
    const user = {
      expiration: addMinutes(Date.now(), 1), //moment().add(1, 'minutes')
    };
    // authService.getCurrentUser.and.returnValue(user);
    authService.getCurrentUser = jasmine.createSpy().and.returnValue(user);
    const guard = new AuthGuard(router, notificationService, authService);

    const result = guard.canActivate();

    expect(result).toBe(true);
  });
});
