import { Component,OnInit } from '@angular/core';
import { AdminStatsService } from 'src/app/core/admin-stats.service';


export interface REVENUE{

  last_1_month:{
    total_revenue : number,
    hotels:[{
      Hotels : string,
      revenue: number
    }]
  },
  last_6_months:{
    total_revenue : number,
    hotels:[{
      Hotels : string,
      revenue: number
    }]
  }
  all_time:{
    total_revenue : number,
    hotels:[{
      Hotels : string,
      revenue: number
    }]
  }
}


@Component({
  selector: 'app-revenue-stats',
  templateUrl: './revenue-stats.component.html',
  styleUrls: ['./revenue-stats.component.css']
})
export class RevenueStatsComponent implements OnInit{
  wholeData : any
  showData : any[]=[]
  Headers : any[] = ["Hotels", "Revenue"]
  totalRevenue: number = 0
  selected_range : string = 'last_1_month'
  sortBy : 'most' | 'least' = 'most'



  constructor(private service : AdminStatsService){}

  ngOnInit(): void {
    this.service.getRevenueData().subscribe(res =>{
      
      this.wholeData = res
      this.updateTable(this.selected_range)
      console.log("show data", this.showData)
    })
  }
  rangeUpdate(){
    this.updateTable(this.selected_range)
  }

  sortData(){
   const sorted = ( this.showData.sort((a,b)=>{
      return this.sortBy === 'most' ? b.revenue - a.revenue : a.revenue - b.revenue
    })
  )
    this.showData = [...sorted]
  }

  updateTable(range : string){
    const rangeData = this.wholeData[range]
    this.showData = rangeData.hotels
    this.totalRevenue = rangeData.total_revenue
    this.sortData()
  }
  
}
