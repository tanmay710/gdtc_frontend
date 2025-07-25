import { Component,OnInit } from '@angular/core';
import { BookingsService } from 'src/app/core/bookings.service';

export interface BOOKINGLIST{
  id : number,
  user :{
    id: number,
    name : string,
    username : string,
    phone : number,
    email : string,
    role : {
      name : string
    }
  },
  hotel:{
    id: number,
    name : string,
    location : string,
    price : number,
    image_url : string,

  },
  check_in : Date,
  check_out : Date
}

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit{
  bookings : BOOKINGLIST[] = []
  constructor(private service : BookingsService){}
  ngOnInit(): void {
    this.service.showAllBookings().subscribe(
      (res: any[])=>{
        this.bookings = res
      },
      (error:any)=>{
        console.log("Error while fetching",error)
        alert("Unauthorized to view the bookings")
      }
    
    )
  }
}
