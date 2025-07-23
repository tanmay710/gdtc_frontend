import { Component,OnInit } from '@angular/core';
import { ApexChart,ApexNonAxisChartSeries } from 'ng-apexcharts';
import { AdminStatsService } from 'src/app/core/admin-stats.service';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit{
  series : number[] =[]
  labels : string[] = []
  chartOptions : any

  constructor(private service : AdminStatsService){}
  ngOnInit(): void {
    this.service.getRevenueData().subscribe((res: any) => {
      const hotelData = res.all_time.hotels;
 
      const sorted = hotelData.sort((a: { total_revenue: number; }, b: { total_revenue: number; }) => b.total_revenue - a.total_revenue);
      const top3 = sorted.slice(0, 3);
      const others = sorted.slice(3);
    
      this.chartOptions = {
          series: [
             ...top3.map((h: any) => h.total_revenue),
            others.reduce((sum: number, h: any) => sum + h.total_revenue, 0)
          ],
          labels: [
           ...top3.map((h: any) => h.hotels),
            'Others'
          ],
          chart: {
            type: 'donut'
          }
        };
});
  }
  
}

