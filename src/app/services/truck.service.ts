import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Truck } from '../entities/truck';

@Injectable({
  providedIn: 'root'
})
export class TruckService {

  private baseUrl = 'http://localhost:8072';

  constructor(private http: HttpClient,
    private AuthService: AuthService  
   ) { }


  addtruck(truck: Truck) {
    
    return this.http.post<Truck>(`${this.baseUrl}/admin/api-trucks/add-truck`, truck);
  }

  getAlltrucks(): Observable<any> {

    
    return this.http.get<Truck>(`${this.baseUrl}/admin/api-trucks/get-all-trucks`);
  }

  getTruckById(id: string): Observable<Truck> {
   
    return this.http.get<Truck>(`${this.baseUrl}/admin/api-trucks/get-truck-by-id/${id}`);
  }

  


  deleteTrucks(id: string): Observable<any> {

    return this.http.delete<Truck>(`${this.baseUrl}/admin/api-trucks/delete-truck/${id}` );
  }

}