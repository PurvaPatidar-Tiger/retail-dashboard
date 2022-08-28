import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map } from 'rxjs/operators';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { addDays } from 'date-fns';
import { UserService } from '../../user/user.service';
import { environment } from '../../../../environments/environment';
import { of, EMPTY } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _authenticated: boolean = false;
  public text='a';
  constructor(
    private _httpClient: HttpClient,
    private _userService: UserService,
    @Inject('LOCALSTORAGE') private localStorage: Storage
  ) { }

  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? '';
  }

  login() {
    console.log('Inside Login Fuction')
    this._userService.user$.subscribe(
      response => {
        console.log(response)
        this.localStorage.setItem(
          'currentUser',
          JSON.stringify({
            token: this.accessToken,
            isAdmin: true,
            email: response.email,
            id: response.id,
            alias: response.email.split('@')[0],
            expiration: addDays(Date.now(), 1), //moment().add(1, 'days').toDate(),
            fullname:response.email.split('@')[0]
          })
        );
      }
    )
  }

// Retrieving data:
  logout(): void {
    // not being used
    // clear token remove user from local storage to log user out
    this.localStorage.removeItem('currentUser');
  }

  getCurrentUser(): any {
    return JSON.parse(this.localStorage.getItem('currentUser') ?? '{"taken":"k"}')
  }

  passwordResetRequest(email: string) {
    return of(true).pipe(delay(1000));
  }

  changePassword(email: string, currentPwd: string, newPwd: string) {
    return of(true).pipe(delay(1000));
  }

  passwordReset(
    email: string,
    token: string,
    password: string,
    confirmPassword: string
  ): any {
    return of(true).pipe(delay(1000));
  }

  signUp(user: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this._httpClient.post('http://localhost:5000/signup', user);
  }

  /**
   * Sign out
   */
  signOut() {
    // Remove the access token from the local storage
    localStorage.removeItem('accessToken');

    // Set the authenticated flag to false
    this._authenticated = false;

    // clear token remove user from local storage to log user out
    this.localStorage.removeItem('currentUser');

  }

  /**
   * Sign in
   *
   * @param credentials
   */
  signIn(credentials: { email: string; password: string }): Observable<any> {
    // Throw error, if the user is already logged in
    if (this._authenticated) {
      return throwError('User is already logged in.');
    }

    return this._httpClient.post('http://localhost:5000/signin', credentials).pipe(
      switchMap((response: any) => {
        // Store the access token in the local storage
        this.accessToken = response.token;

        // Set the authenticated flag to true
        this._authenticated = true;

        // Store the user on the user service
        console.log(response.user)
        this._userService.user = response.user;

        // Return a new observable with the response
        return of(response);
      })
    );
  }
}
