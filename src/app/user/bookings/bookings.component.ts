import { Component, OnInit } from '@angular/core';
import { BookingsService } from 'src/app/core/bookings.service';
 
export interface USERBOOKING{
  id : number,
  user :{
    id : number,
    name : string,
    username : string,
    phone : number,
    email : string,
    role :{
      name : string
    }
  },
  hotel : {
    id : number,
    name : string,
    location : string,
    price : number,
    image_url : string
  },
  check_in : Date,
  check_out : Date
}


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
})
export class BookingsComponent implements OnInit {
  userBookings: USERBOOKING[] = [];
  filteredBookings: any[] = [];
  searchText: string = '';
  sort: 'asc' | 'desc' = 'desc';
 
  constructor(private service: BookingsService) {}
 
  ngOnInit(): void {
    this.service.showUserBookings().subscribe(
      (data) => {
        this.userBookings = data;
        this.applyFilters(); // initial load
      },
      (error) => {
        console.error(error);
      }
    );
  }
 
  onSearchChange() {
    this.applyFilters();
  }
 
  applyFilters() {
    const text = this.searchText.toLowerCase();
    this.filteredBookings = this.userBookings.filter((booking) =>
      booking.hotel.name.toLowerCase().includes(text)
    );
 
    this.filteredBookings.sort((a, b) => {
      const dateA = new Date(a.check_in).getTime();
      const dateB = new Date(b.check_in).getTime();
      return this.sort === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }
 
  sort_filter(order: 'asc' | 'desc') {
    this.sort = order;
    this.applyFilters();
  }
}