import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/auth/auth.service';
import { AdminGuard } from './admin.guard';

describe('AdminGuard', () => {
  let router: Router;
  let authService: AuthenticationService;

  beforeEach(() => {
    router = jasmine.createSpyObj(['navigate']);
    authService = jasmine.createSpyObj(['getCurrentUser']);
  });

  it('create an instance', () => {
    const guard = new AdminGuard(router, authService);
    expect(guard).toBeTruthy();
  });

  it('returns true if user is admin', () => {
    const user = { isAdmin: true };
    authService.getCurrentUser = jasmine.createSpy().and.returnValue(user);
    const guard = new AdminGuard(router, authService);

    const result = guard.canActivate();

    expect(result).toBe(true);
  });

  it('returns false if user does not exist', () => {
    authService.getCurrentUser = jasmine.createSpy().and.returnValue(null);
    // authService.getCurrentUser.and.returnValue(null);
    const guard = new AdminGuard(router, authService);

    const result = guard.canActivate();

    expect(result).toBe(false);
  });

  it('returns false if user is not admin', () => {
    const user = { isAdmin: false };
    authService.getCurrentUser = jasmine.createSpy().and.returnValue(user);
    // authService.getCurrentUser.and.returnValue(user);
    const guard = new AdminGuard(router, authService);

    const result = guard.canActivate();

    expect(result).toBe(false);
  });

  it('redirects to root if user is not an admin', () => {
    const user = { isAdmin: false };
    // authService.getCurrentUser.and.returnValue(user);
    authService.getCurrentUser = jasmine.createSpy().and.returnValue(user);
    const guard = new AdminGuard(router, authService);

    guard.canActivate();

    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('redirects to root if user does not exist', () => {
    authService.getCurrentUser = jasmine.createSpy().and.returnValue(null);
    // authService.getCurrentUser.and.returnValue(null);
    const guard = new AdminGuard(router, authService);

    guard.canActivate();

    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
