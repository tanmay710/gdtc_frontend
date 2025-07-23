import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AddHotelsService {
  private url = "http://127.0.0.1:8000/";
  constructor(private http : HttpClient) { }
  addHotels(formData : FormData){
    return this.http.post(`${this.url}add-hotels`,formData)
  }
}
