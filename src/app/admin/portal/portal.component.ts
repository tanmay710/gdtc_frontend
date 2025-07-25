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
 

  isOpen = true
  toggleSidebar(){
    this.isOpen = !this.isOpen
  }
}

