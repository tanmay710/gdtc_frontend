import { Component,OnInit } from '@angular/core';
import { BookingsService } from 'src/app/core/bookings.service';
import { FormBuilder,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export interface BOOKING{
  id : number,
  user :{
    id : number,
    name : string,
    username : string,
    phone : number,
    email : string,
    role:{
      name : string
    }
  },
  hotel :{
    id : number,
    name : string,
    location : string,
    price : number,
    image_url: string
  },
  check_in : Date
  check_out : Date
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  bookings : BOOKING[] = []
  editForms :{[key : number] : FormGroup}={}
  editingId : number | null = null
  constructor(private service : BookingsService, private fb : FormBuilder, private router : Router, private toaster : ToastrService){}
  ngOnInit(): void {
    this.fetchBookings()
  }
  fetchBookings(){
    console.log('call')
    this.service.getCurrentBooking().subscribe(data=>{
      console.log(data)
      this.bookings = [data]
     
        this.editForms[data.id] = this.fb.group({
          hotel_id : [data.hotel.id],
          hotel_name: [data.hotel.hotel_name],
          check_in : [data.check_in],
          check_out : [data.check_out]
        })
    })

  }
  enableEdit(id:number){
    this.editingId = id;
  }
  updateBooking(id:number){
    const form = this.editForms[id]
    this.service.updateBookings(id,form.value).subscribe(() =>{
      this.toaster.success("Booking updated")
      this.editingId = null;
      this.fetchBookings();
    })
  }
  cancelBooking(id:number){
    if(confirm("Are you sure you want to cancel this booking?")){
      this.service.cancelBooking(id).subscribe(()=>{
        this.toaster.success("Booking Cancelled")
        this.router.navigate(['hotels'])
      })
    }
  }

}
