import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder,FormGroup } from '@angular/forms';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  constructor(private toaster: ToastrService){}
  onClick(){
    this.toaster.success("You have successfully contacted us")
  }
}
