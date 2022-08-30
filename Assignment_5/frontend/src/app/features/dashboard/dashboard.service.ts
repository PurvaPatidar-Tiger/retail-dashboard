import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {

  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient, private router: Router, private ar: ActivatedRoute) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------


  getBarChartOneDta(): Observable<any> {
    console.log('Hi I am here in getBar1')
    return this._httpClient.get<{ x: string[], y: number[] }>('http://localhost:5000/barchartone');
  }
  getBarChartTwoDta(): Observable<any> {
    console.log('Hi I am here in getBar2')
    return this._httpClient.get<{ x: string[], y: number[] }>('http://localhost:5000/barcharttwo');
  }
  getScatterChartDta(): Observable<any> {
    console.log('Hi I am here in getBar1')
    return this._httpClient.get<{ x: string[], y: number[] }>('http://localhost:5000/scatterchart');
  }
}
