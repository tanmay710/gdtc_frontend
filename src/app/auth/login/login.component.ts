import { Component } from '@angular/core';
import { LoginService } from 'src/app/core/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    username  : '',
    password : ''
  }
  constructor(private service : LoginService, private router : Router, private toaster : ToastrService){}
  onLogin(){
    this.service.login(this.loginData).subscribe({
      next : (res) =>{
        this.toaster.success('Successfully logged in')
        // alert("Successfully logged in")
        localStorage.setItem('token',res.access_token)
        localStorage.setItem('role',res.role)
        this.service.setRole(res.role)
        const tokenParts = res.access_token.split('.');

        const payload = JSON.parse(atob(tokenParts[1]))
        const role =payload.role
        if(role == 'admin'){
          this.router.navigate(['/admin'])
        }
        else{
          this.router.navigate(['/hotels'])
        }
      },
      
      error : (res) =>{
        this.toaster.error('Could not login')
      }
    })
  }
  
}
