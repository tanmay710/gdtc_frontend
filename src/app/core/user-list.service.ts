import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserListService {

  private url = "http://127.0.0.1:8000/";
  constructor(private http : HttpClient) { }
  userList(): Observable<any[]>{
    return this.http.get<any[]>(`${this.url}admin/users`)
  }
  adminList():Observable<any[]>{
    
    return this.http.get<any[]>(`${this.url}admin/admins`)
  }
}
