import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Driver } from '../entities/driver';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private baseUrl = 'http://localhost:8072';

  constructor(
    private http: HttpClient,
    private AuthService: AuthService   ) { }
  addDriver(driver: Driver) {
    

    return this.http.post<Driver>(`${this.baseUrl}/admin/api-drivers/add-driver`, driver);
  }

  getAllDriver(): Observable<any> {

   
    return this.http.get<Driver>(`${this.baseUrl}/admin/api-drivers/get-all-drivers`);
  }

  getDriverById(id: string): Observable<Driver> {
   
    return this.http.get<Driver>(`${this.baseUrl}/admin/api-drivers/get-driver-by-id/${id}`);
  }

  editDriver(id: string, driver: Driver): Observable<Driver> {
  
    console.log('Request URL:', `${this.baseUrl}/admin/api-drivers/edit-driver/${id}`);
    console.log('Request Headers:');
    console.log('Request Body:', driver);
    return this.http.put<Driver>(`${this.baseUrl}/admin/api-drivers/edit-driver/${id}`, driver);
}


deleteDrivers(id: string): Observable<any> {
  
  return this.http.delete<Driver>(`${this.baseUrl}/admin/api-drivers/delete-driver/${id}` );
}
}
