import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { PortalComponent } from './portal/portal.component';
import { UserListComponent } from './user-list/user-list.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AddHotelsComponent } from './add-hotels/add-hotels.component';
import { BookingstatsComponent } from './bookingstats/bookingstats.component';
import { RevenueStatsComponent } from './revenue-stats/revenue-stats.component';
  import { ChartsComponent } from './charts/charts.component';
const routes: Routes = [
  {path : '', component : PortalComponent,
  children :[
  { path: '', redirectTo:'booking',pathMatch: 'full'},
  {path:'booking',component: BookingListComponent},
  {path: 'portal', component : PortalComponent},
  {path : 'users', component : UserListComponent},
  {path : 'admins',component: AdminListComponent},
  {path:'add', component : AddHotelsComponent},
  {path : 'bookstat',component : BookingstatsComponent},
  {path : 'revenuestat',component: RevenueStatsComponent},
  {path : 'chart', component : ChartsComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
