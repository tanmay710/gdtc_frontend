import { Component,OnInit } from '@angular/core';
import { LoginService } from 'src/app/core/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  constructor(private service : LoginService,private router : Router, private toaster: ToastrService){}
  isLoggedIn = false;
  isAdmin = false
  username : string | null = ''
  dropDown = false
  ngOnInit(): void {
    this.service.getStatus().subscribe(data =>{
      this.isLoggedIn = data
      
    })
    this.service.getRole().subscribe(role =>{
      this.isAdmin = role=== 'admin'
    })
    this.service.getUsername().subscribe(name =>{
      this.username = name
    })
    
  }
  toggleDropdown(){
    this.dropDown = !this.dropDown
  }

  logOut(){
    if(confirm("Are you sure you want to logout")){
      this.service.logout();
    
    this.router.navigate(['/auth/login'])
    this.toaster.success("You have logged out")
    }
    
    
  }
  checkout(){
    this.router.navigate(['user/checkout'])
  }
}
