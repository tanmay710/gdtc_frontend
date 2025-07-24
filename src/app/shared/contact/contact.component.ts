import { Component} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder,Validators} from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent{
  contactUs: FormGroup;
  constructor(private toaster: ToastrService, private fb : FormBuilder){
      this.contactUs = this.fb.group({
      email :['',Validators.required, Validators.email],
      Subject : ['',Validators.required],
      text : ['',Validators.required]
    })
  }
  // ngOnInit():{
  //   this.contactUs =  this.fb.group({
  //     email : new FormGroup('',[Validators.required,Validators.email])
  //   })
  // }
 
  onClick(){
    if(this.contactUs.valid){
      this.toaster.success("You have successfully contacted us")
    }
    
    
  }
}
