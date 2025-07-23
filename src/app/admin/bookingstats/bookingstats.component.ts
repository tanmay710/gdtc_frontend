import { Component, OnInit } from '@angular/core';
import { AdminStatsService } from 'src/app/core/admin-stats.service';
@Component({
  selector: 'app-bookingstats',
  templateUrl: './bookingstats.component.html',
  styleUrls: ['./bookingstats.component.css']
})
export class BookingstatsComponent implements OnInit{
  wholeData : any
  showData : any[]=[]
  Headers : any[] = ["Hotel", "Count"]
  totalBooking: number = 0
  selected_range : string = 'last_1_month'
  sortBy : 'most' | 'least' = 'most'



  constructor(private service : AdminStatsService){}

  ngOnInit(): void {
    this.service.getBookingData().subscribe(res =>{
      this.wholeData = res
      this.updateTable(this.selected_range)
    })
  }
  rangeUpdate(){
    this.updateTable(this.selected_range)
  }

  sortData(){
   const sorted = ( this.showData.sort((a,b)=>{
      return this.sortBy === 'most' ? b.count - a.count : a.count - b.count
    })
  )
    this.showData = [...sorted]
  }

  updateTable(range : string){
    const rangeData = this.wholeData[range]
    this.showData = rangeData.hotels
    this.totalBooking = rangeData.total_bookings
    this.sortData()
  }
}
