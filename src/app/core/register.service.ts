import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private Url = "http://127.0.0.1:8000/"

  constructor(private http : HttpClient) { }

  register(data : any):Observable<any>{
    return this.http.post(`${this.Url}register`,data);
  }
}

