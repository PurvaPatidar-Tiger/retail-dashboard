import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss'],
})
export class SignoutComponent implements OnInit {
  constructor(
    private _authService: AuthenticationService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    console.log();
  }
}
