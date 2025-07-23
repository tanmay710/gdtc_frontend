import { Component } from '@angular/core';
import { RegisterService } from 'src/app/core/register.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerData = {
  name: '',
  username: '',
  phone: '',
  email: '',
  password: '',
  role_id: 1
};
 constructor(private service : RegisterService, private router : Router, private toaster : ToastrService){}
onRegister() {
  this.service.register(this.registerData).subscribe({
    next :(res) => {
      this.toaster.success("Successfully registered")
      this.router.navigate(['auth/login'])
    },
    error : (err) =>{
      this.toaster.error("Registration failed",err)
    }
  })
}
}
