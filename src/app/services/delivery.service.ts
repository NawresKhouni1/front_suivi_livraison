import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Delivery } from '../entities/delivery';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private baseUrl = 'http://localhost:8072';

  constructor(
    private http: HttpClient,
    private AuthService: AuthService   ) { }


  addDelivery(delivery: Delivery) {
   

    return this.http.post<Delivery>(`${this.baseUrl}/admin/api-deliveries/add-delivery`, delivery);
  }

  getAllDeliveries(): Observable<any> {

   
    return this.http.get<Delivery>(`${this.baseUrl}/admin/api-deliveries/get-all-deliveries`);
  }

  getDeliveryById(id: string): Observable<Delivery> {
    
    return this.http.get<Delivery>(`${this.baseUrl}/admin/api-deliveries/get-delivery-by-id/${id}`);
  }

  getDeliveryByTrackingNumber(trackNumber: string): Observable<Delivery> {
   
    return this.http.get<Delivery>(`${this.baseUrl}/admin/api-deliveries/get-delivery-by-id/${trackNumber}`);
  }


  deleteDeliveries(id: string): Observable<any> {
   
    return this.http.delete<Delivery>(`${this.baseUrl}/admin/api-deliveries/delete-delivery/${id}` );
  }

}