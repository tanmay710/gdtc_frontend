import { Component,OnInit } from '@angular/core';
import { BookingsService } from 'src/app/core/bookings.service';
@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit{
  bookings : any[] = []
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
