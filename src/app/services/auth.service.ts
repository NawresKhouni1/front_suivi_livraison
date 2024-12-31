import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private UrlSignin = 'http://localhost:8072/auth/signin';
  private UrlSignup = 'http://localhost:8072/auth/signup';

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService,
    private userService: UserService

  ) { }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getIdUser(): string | undefined {
    const idUser = localStorage.getItem('id_user');
    return idUser !== null ? idUser : undefined;
  }

  setIdUser(idUser: string): void {
    localStorage.setItem('id_user', idUser);
  }

  isLoggedIn(): Observable<boolean> {
    const token = this.getToken();
    if (token == null) {
      return of(false);
    }

    // I  have a method getUserData() in your service to fetch the user data
    return this.getUserData().pipe(
      catchError((error) => {
        console.log(error);
        return of(false);
      }),
      filter((currentUser) => currentUser !== undefined),
      map((currentUser) => {
        console.log(currentUser);
        console.log("Current user:", currentUser.id);
        this.setIdUser(currentUser.id);

        if (!currentUser) {
          return false;
        }
        return true;
      })
    );
  }

  kickOut(): void {
    this.toastr.error("Please login to continue", "Session expired");
    this.logout();
  }

  logout(): void {
    localStorage.removeItem('id_user');
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  login({ email, password }: any): Observable<any> {
    const data = { email, password };
    return this.http.post<any>(this.UrlSignin, data);
  }

  // signup(data: any): Observable<any> {
  //   return this.http.post<any>(this.UrlSignup, data);
  // }

  signup({ email, password, role }: { email: string; password: string; role: string }): Observable<any> {
    const data = { email, password, role };

    return this.http.post<any>(this.UrlSignup, data).pipe(
      catchError((error: HttpErrorResponse) => {
        // Log the error to the console
        console.error('Signup error:', error);

        // Display an error message to the user
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          this.toastr.error('An error occurred:', error.error.message);
        } else {
          // Server-side error
          this.toastr.error(`Server returned code ${error.status}, error: ${error.error}`);
        }

        // Pass the error along to the caller
        return throwError('Signup failed');
      })
    );
  }
  

  private getUserData(): Observable<any> {
    

    return this.http.get<any>('http://localhost:8072/public/userDetails' );
  }
}



