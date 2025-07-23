import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent {
  constructor(private http : HttpClient,private router : Router){}
  viewBooking(){
    this.router.navigate(['admin/booking'])
  }
  viewUsers(){
    this.router.navigate(['admin/users'])
  }
  viewAdmins(){
    this.router.navigate(['admin/admins'])
  }
  addHotels(){
    this.router.navigate(['admin/add'])
  }

  isOpen = true
  toggleSidebar(){
    this.isOpen = !this.isOpen
  }
}

