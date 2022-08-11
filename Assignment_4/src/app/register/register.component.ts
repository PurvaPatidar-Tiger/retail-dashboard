import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }
  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
    this.http.post('http://localhost:5000/register',
      {
        firstname: form.value.firstname,
        lastname: form.value.lastname,
        username: form.value.username,
        password: form.value.password,
      }, httpOptions).subscribe(responsedata => {
        console.log(responsedata)
        alert(responsedata['message'] +
          '                                          Redirecting you to LOGIN PAGE')
        this.router.navigate(['/login'])
      }, error => {
        alert('Given user specifications already exits')
      })
  }
}