import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { LoginService } from './core/login.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
 token = localStorage.getItem('token')
 decodedToken = {
  exp : 0,
  role : "",
  sub : ""
 }
 expTime : number = 0
 currentTime : number = 0
 constructor(private service : LoginService, private router : Router){}

 ngOnInit(): void {
  if(this.token){
    this.decodedToken = jwtDecode(this.token)
    this.expTime = this.decodedToken.exp*1000
    this.currentTime = Date.now()
    if(this.currentTime >= this.expTime){
      console.log("expiration time is done")
      alert("You have been login time has been expired")
      this.service.logout()
      this.router.navigate(['auth/login'])
    }
    else{
      console.log("expiration time is remaining")
    }
  }
 }
}