import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminStatsService {
  private url = "http://127.0.0.1:8000/";
  constructor(private http : HttpClient) { }

  getBookingData(){
    return this.http.get<any>(`${this.url}count-bookings`)
  }

  getRevenueData(){
    return this.http.get<any>(`${this.url}revenue`)
  }
}
