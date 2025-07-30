import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/core/login.service';
import { BookingsService } from 'src/app/core/bookings.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; 
import flatpickr from 'flatpickr';

export interface Hotels{
  id : number,
  name : string,
  location : string,
  price : number,
  image_url : string
}

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {
  checkInDate: string = '';
  checkOutDate: string = '';
  today: string = new Date().toISOString().split('T')[0];
  tomorrow : Date = new Date()
  yearEnd : Date = new Date()
  hotels: Hotels[] = [];
  filteredHotels: Hotels[] = [];

  clickedHotel : Hotels = {
    id :0,
    name : "",
    location : '',
    price : 0,
    image_url : ''
  }

  selectedHotelId: number | null = null;
  bookedDates: string[] = [];
 
  isLoggedIn = false;
  
  showBox = false;

  pageSize = 6;
  currentPage = 0;
 
 
  searchTerm: string = '';
  last_searched : string ='0;'
  sortOrder: string = '';
 
  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private bookingsService: BookingsService,
    private router: Router,
    private toaster : ToastrService
  ) {}
 
  ngOnInit(): void {
    this.tomorrow.setDate(this.tomorrow.getDate()+1)
    this.yearEnd = new Date(new Date().getFullYear(),11,31)
    this.fetchHotels();
    this.loginService.getStatus().subscribe(data => {
      this.isLoggedIn = data;
    });
  }
 
  fetchHotels() {
    this.http.get<Hotels[]>("http://localhost:8000/hotels").subscribe(data => {
    this.hotels = data;
    this.filteredHotels = [...this.hotels]; //shallow copy
    });
  }
 
  bookHotel(hotelId: number) {
    if (!this.loginService.isLoggedIn()) {
      this.toaster.error("Please login first!");
      return;
    }
    this.selectedHotelId = hotelId;
    this.bookingsService.getBookedDates(hotelId).subscribe({
      next: (dates) => this.bookedDates = dates,
      error: (err) => console.error(err)
    });
    this.showBox = true
    if(!this.checkInDate || !this.checkOutDate){
      this.toaster.error("Please select check-in and check-out dates!");
      return;
    }
    else{
      for(let i=0; i < this.hotels.length; i++){
      if(this.hotels[i].id === this.selectedHotelId){
        this.clickedHotel = this.hotels[i]
      }
    }
    }
    

  }
 
  confirmBooking(hotelId: number) {
    if (!this.checkInDate || !this.checkOutDate) {
      this.toaster.error("Please select check-in and check-out dates!");
      return;
    }
 
    const start = new Date(this.checkInDate)
    const end = new Date(this.checkOutDate)
    let overlap = false

    for(let d = new Date(start); d<= end; d.setDate(d.getDate()+1)){
      const i = d.toISOString().split('T')[0]
      if(this.bookedDates.includes(i)){
        overlap = true;
        break;
      }
    }
    if(overlap){
      this.toaster.error("Selected dates are already booked")
    }
 
    const token = this.loginService.getToken();
    const payload = {
      hotel_id: hotelId,
      check_in: new Date(this.checkInDate).toISOString().split('T')[0],
      check_out: new Date(this.checkOutDate).toISOString().split('T')[0]
    };
 
    this.http.post("http://127.0.0.1:8000/book", payload, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).subscribe({
        next: () => {
          this.toaster.success("Booking confirmed!");
          this.router.navigate(['user/checkout']);
          this.selectedHotelId = null;
        },
        error: () => this.toaster.error("Booking failed.")
      });
    }
 
  openMap(location: string) {
      const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
      window.open(mapUrl, '_blank');
  }
 
  
  nextPage() {
    if ((this.currentPage + 1) * this.pageSize < this.filteredHotels.length) {
      this.currentPage++;
    }
  }
 
  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }
 
  paginatedHotels() {
    const start = this.currentPage * this.pageSize;
    return this.filteredHotels.slice(start, start + this.pageSize);
  }
 
  totalPagesArray(): number[] {
    const total = Math.ceil(this.filteredHotels.length / this.pageSize);
    return Array.from({ length: total }, (_, i) => i);
  }
 
  goToPage(page: number) {
    this.currentPage = page;
  }
  
  
  searchHotels() {
    const term = this.searchTerm.toLowerCase();
    
    this.last_searched = this.searchTerm
    if(this.last_searched !== null){
      
    }
    this.filteredHotels = this.hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(term) || hotel.location.toLocaleLowerCase().includes(term)
    );
    this.applySorting();
    this.currentPage = 0;
  }
 
  
  applySorting() {
    if (this.sortOrder === 'asc') {
      this.filteredHotels.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === 'desc') {
      this.filteredHotels.sort((a, b) => b.price - a.price);
    }
  }
 
  onSortChange(order: string) {
    this.sortOrder = order;
    this.applySorting();
  }

  bookingHistory(){
    this.router.navigate(['user/bookings'])
  }

  loginStatus(){
    const token = localStorage.getItem('token')
    if(token){
      this.isLoggedIn = true
    }
    else{
      this.isLoggedIn = false
    }
  }

  closeBox(){
    this.showBox = false
  }
}