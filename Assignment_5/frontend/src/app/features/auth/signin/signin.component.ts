import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  @ViewChild('signInNgForm') signInNgForm!: NgForm;
  signInForm!: FormGroup;
  showAlert: boolean = false;
  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthenticationService,
    private _router: Router,
    private translate: TranslateService,
  ) {
  }

  ngOnInit(): void {
    // Create the form
    this.signInForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rememberMe: [''],
    });
  }

  openAlert() { }

  togglePasswordVisibility() { }

  signIn(): void {
    // Return if the form is invalid
    if (this.signInForm.invalid) {
      return;
    }

    // Disable the form
    this.signInForm.disable();

    // Hide the alert
    this.showAlert = false;

    // Sign in
    this._authService.signIn(this.signInForm.value).subscribe(

      response => {
        // Inside Signin Form
        console.log('Inside Signin subscribe')
        console.log(this.signInForm.status)
        // Re-enable the form
        this.signInForm.enable();
        console.log(this.signInForm.status)
        // Show the alert
        this.showAlert = true;
        // Set the redirect url.
        // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
        // to the correct page after a successful sign in. This way, that url can be set via
        // routing file and we don't have to touch here.
        this.signInForm.enable();
        console.log('Signin Completeted')
        console.log(this.signInForm.status)
        this._router.navigate(['/app/analytics']);

        console.log('Calling Login Function Of AuthService to Store CurrentUser')
        this._authService.login()

      },
    );
  }
}