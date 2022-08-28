import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { timer } from 'rxjs';
import { Subscription } from 'rxjs';

import { AuthenticationService } from 'src/app/core/services/auth/auth.service';
import { SpinnerService } from 'src/app/core/services/spinner/spinner.service';
import { AuthGuard } from 'src/app/core/guards/auth/auth.guard';
import { MenuItemConfig } from '../navigation.types';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
})
export class BasicComponent implements OnInit, OnDestroy, AfterViewInit {
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  showSpinner: boolean = false;
  userName: string = '';
  isAdmin: boolean = false;
  menuItems = MenuItemConfig;
  private autoLogoutSubscription: Subscription = new Subscription();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    public spinnerService: SpinnerService,
    private authService: AuthenticationService,
    private authGuard: AuthGuard,
  ) {
    this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.isAdmin = user.isAdmin;
    this.userName = user.fullname;
    // Auto log-out subscription
    const timer$ = timer(2000, 5000);
    this.autoLogoutSubscription = timer$.subscribe(() => {
      this.authGuard.canActivate();
    });
  }

  ngOnDestroy(): void {
    // tslint:disable-next-line: deprecation
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.autoLogoutSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  OnLogOut(){
    console.log('Inside LogOut Function ')
    this.authService.signOut()
  }
}
