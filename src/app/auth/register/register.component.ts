import { Component } from '@angular/core';
import { RegisterService } from 'src/app/core/register.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  reg : FormGroup
  registerData = {
  name: '',
  username: '',
  phone: '',
  email: '',
  password: '',
  role_id: 1
};


 constructor(private service : RegisterService, private router : Router, private toaster : ToastrService,
  private fb : FormBuilder
 ){
  this.registerData.role_id = 1
  this.reg = this.fb.group({
    name : ['',Validators.required],
    username : ['',Validators.required],
    phone : ['',[Validators.required,Validators.pattern("[0-9]{10}")]],
    email : ['', [Validators.required,Validators.email]],
    password : ['',[Validators.required,Validators.minLength(6)]]
  })
 }
onRegister() {
  this.service.register(this.registerData).subscribe({
    next :() => {
      this.toaster.success("Successfully registered")
      this.router.navigate(['auth/login'])
    },
    error : (err) =>{
      this.toaster.error("Registration failed,please fill all the fields",err)
    }
  })
}
}
