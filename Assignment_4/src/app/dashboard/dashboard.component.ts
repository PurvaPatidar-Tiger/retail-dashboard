import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  uniquevisitors: number = 0;
  averagesales: number = 0;
  totalsales: number = 0;
  sold_items = [];
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {

    const token = localStorage.getItem("token");
    console.log(token)

    this.http.get('http://localhost:5000/total-sales', { headers: new HttpHeaders().set('Authorization', "Bearer " + token) }).subscribe(responsedata => {
      console.log(responsedata)
      this.totalsales = responsedata['total_sales']
    }, error => {
      console.log(error)
    })
    this.http.get('http://localhost:5000/uniquevisitors', { headers: new HttpHeaders().set('Authorization', "Bearer " + token) }).subscribe(responsedata => {
      console.log(responsedata['unique_visitor'])
      this.uniquevisitors = responsedata['unique_visitor']
    }, error => {
      console.log(error)
    })
    this.http.get('http://localhost:5000/avg-sales', { headers: new HttpHeaders().set('Authorization', "Bearer " + token) }).subscribe(responsedata => {
      console.log(responsedata['average_sales'])
      this.averagesales = responsedata['average_sales']
    }, error => {
      console.log(error)
    })
    this.http.get('http://localhost:5000/sales', { headers: new HttpHeaders().set('Authorization', "Bearer " + token) }).subscribe(responsedata => {
      console.log(responsedata['items'])
      this.sold_items = responsedata['items']
      console.log(this.sold_items)
    }, error => {
      console.log(error)
    })
  }

  OnLogOut() {
    this.router.navigate(['/login'])
  }



}