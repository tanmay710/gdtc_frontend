import { Component, OnInit } from '@angular/core';
import { AdminStatsService } from 'src/app/core/admin-stats.service';
import {
  ChartConfiguration,
  ChartType,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Tooltip,
  Legend,
  Chart,
  PieController,
  ArcElement,

} from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, BarController, Tooltip, Legend,PieController,ArcElement);

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  barChartType: 'bar' = 'bar';

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: true,
    plugins :{
      legend:{
        display : true,
        position: 'top'
      },
      title : {
        display : true,
        text : "Top 5 hotels by revenue",
        font:{
          size : 18,
          weight : 'bold'
          
        },
       color : 'black'
      }
    },
    scales :{
      x:{
        ticks:{
          font:{
            size:12
          },
          
        },
      grid:{
        display : false
      }
      },
      y:{
        grid:{
          display : false
        }
      }
    },
    
  };

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Revenue',
        backgroundColor: '#14e77a '
      }
    ]
  };

  pieChartData : ChartConfiguration<'pie'>['data']={
    labels : [],
    datasets : [
      {
        data: [],
        backgroundColor : ['#1fdf6b','#1f8edf','#e71480 ','#AAAAAA']
      }
    ]
  }
  pieChartOptions : ChartConfiguration<'pie'>['options']={
    responsive : true,
    plugins:{
      legend : {
        display : true,
        position : 'right'
      
      },
      title:{
        display : true,
        text : 'Revenue share',
        font:{
          size : 18,
          weight : 'bold'
        },
        color : 'black'
      }
    }
  }
  pieChartType : 'pie'= 'pie'

  constructor(private service: AdminStatsService) { }

  ngOnInit(): void {
    this.service.getRevenueData().subscribe((res) => {
      console.log(this.pieChartData)
      const allHotels = res.all_time.hotels
      const top3 = [...allHotels].sort((a:any,b:any)=> b.revenue - a.revenue).slice(0,3) //shallow cloning so that I can modify this without changing original
      const others = allHotels.slice(3).reduce((sum:number,h:any)=> sum + h.revenue,0)

      this.pieChartData.labels=[
        top3[0].Hotels,
        top3[1].Hotels,
        top3[2].Hotels,
        'Others'
      ]
      this.pieChartData.datasets[0].data=[
        top3[0].revenue,
        top3[1].revenue,
        top3[2].revenue,
        others
      ]      
      
      const hotels = res.all_time.hotels
        .sort((a: any, b: any) => b.revenue - a.revenue)
        .slice(0, 5);

      this.barChartData = {
        labels: hotels.map((hotel: any) => hotel.Hotels),
        datasets: [
          {
            data: hotels.map((hotel: any) => hotel.revenue),
            label: 'Revenue',
            backgroundColor: '#1477e7 '
          }
        ]
      };
      this.barChartData= {...this.barChartData}
      this.pieChartData = {...this.pieChartData} //necessary for rendering, ... is spread operator, forces angular to update the chart and re render it
    });
  }
}