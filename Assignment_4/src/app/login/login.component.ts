import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  OnSubmit(form: NgForm) {
    this.http.post('http://localhost:5000/login',
      {
        username: form.value.username,
        password: form.value.password,
      }).subscribe(responsedata => {
        console.log(responsedata)
        alert('Successfully Loged in' + ', Redirecting you to DASHBOARD PAGE')
        localStorage.setItem('token', responsedata['token']);
        this.router.navigate(['/dashboard'])
      }, error => {
        console.log(error)
        alert('Invalid Credentials')
      })
  }
}