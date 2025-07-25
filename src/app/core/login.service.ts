import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = "http://127.0.0.1:8000/"
  public status = new BehaviorSubject<boolean>(this.isLoggedIn())
  public role = new BehaviorSubject<string | null>(localStorage.getItem('role'))
  public username = new BehaviorSubject<string | null>(localStorage.getItem('username'))

  constructor(private http: HttpClient) { }
  login(data :any):Observable<any>{
    const body = new URLSearchParams();
    body.set('username',data.username);
    body.set('password',data.password)

    return this.http.post(`${this.url}login`,
      body.toString(),{
        headers :{
          'Content-Type' : 'application/x-www-form-urlencoded'
        }
      }
    ).pipe(
      tap((res : any)=>{
        console.log("login response", res.role)
        console.log(res)
        localStorage.setItem("token",res.access_token);
        localStorage.setItem('role',res.role)
        localStorage.setItem('username',res.username)
        this.status.next(true)
        this.role.next(res.role)
        this.username.next(res.username)
        
      })
    )
  } 
   setRole(role: string){
    localStorage.setItem('role',role)
    this.role.next(role)
   }
   getRole():Observable<string | null>{
    return this.role.asObservable()
   }

  logout(){
    localStorage.removeItem("token")
    localStorage.removeItem('role')
    this.status.next(false)
    this.role.next(null)
  }
  isLoggedIn(): boolean{
    return !!localStorage.getItem("token")
  }
  getToken(): string | null{
    return localStorage.getItem("token")
  }
  getStatus(): Observable<boolean>
  {
    return this.status.asObservable()
  } 

getUsername():Observable<string | null>{
  return this.username.asObservable()
}

isAdmin():boolean{
  return localStorage.getItem('role') === 'admin'
}
isUser():boolean{
  return localStorage.getItem('role') === 'user'
}

}
