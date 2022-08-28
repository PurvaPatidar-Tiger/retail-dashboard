// import { Injectable } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   Resolve,
//   RouterStateSnapshot,
// } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AdminService } from './admin.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AdminResolver implements Resolve<any> {
//   /**
//    * Constructor
//    */
//   constructor(private _adminService: AdminService) {}

//   // -----------------------------------------------------------------------------------------------------
//   // @ Public methods
//   // -----------------------------------------------------------------------------------------------------

//   /**
//    * Resolver
//    *
//    * @param route
//    * @param state
//    */
//   resolve(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<any> {
//     return this._adminService.getData();
//   }
// }
