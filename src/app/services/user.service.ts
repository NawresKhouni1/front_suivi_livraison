import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'http://localhost:8072/public/userDetails';
  constructor(private http: HttpClient) { }


  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
getUserData(): Observable<any> {
  return this.http.get<any>( this.userUrl);

}





}
