import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BOOKINGLIST } from '../admin/booking-list/booking-list.component';
import { USERBOOKING } from '../user/bookings/bookings.component';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

    private url = "http://127.0.0.1:8000/";
    constructor(private http : HttpClient){}
  
    showAllBookings():Observable<BOOKINGLIST[]>{
    
      return this.http.get<BOOKINGLIST[]>(`${this.url}admin/bookings`)
    }
    getBookedDates(hotel_id : number):Observable<string[]>{
      return this.http.get<string[]>(`${this.url}get-dates/${hotel_id}`)
    }

    showUserBookings(): Observable<USERBOOKING[]>{
    
      return this.http.get<USERBOOKING[]>(`${this.url}user-booking`)
    }

    getCurrentBooking():Observable<any>{
      return this.http.get<any>(`${this.url}recent-booking`)
    }

    updateBookings(bookingId : number,data : any): Observable<any>{
       return this.http.put(`${this.url}update?booking_id=${bookingId}`,data)
    }

    cancelBooking(bookingId : number): Observable<any>{
      return this.http.delete(`${this.url}cancel?booking_id=${bookingId}`)
    }
}
