// import { Observable, tap } from 'rxjs';
// import { Injectable } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   CanActivate,
//   RouterStateSnapshot,
//   UrlTree,
//   Router,
// } from '@angular/router';
// import { AuthService } from '../services/auth.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {
//   constructor(private auth: AuthService, private router: Router) { }

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<boolean | UrlTree> {
//     return this.auth.isLoggedIn().pipe(
//       tap((loggedIn) => {
//         if (!loggedIn) {
//           this.router.navigate(['/login']);
//           this.auth.kickOut();
//         }
//       })
//     );
//   }
// }
