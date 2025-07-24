import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UserListComponent } from './user-list/user-list.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { PortalComponent } from './portal/portal.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AddHotelsComponent } from './add-hotels/add-hotels.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule,FormBuilder } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BookingstatsComponent } from './bookingstats/bookingstats.component';

import {MatTableModule} from '@angular/material/table'
import { MatOptionModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { RevenueStatsComponent } from './revenue-stats/revenue-stats.component';
import {NgChartsModule} from 'ng2-charts'
import { ChartsComponent } from './charts/charts.component';

@NgModule({
  declarations: [
    AdminComponent,
    UserListComponent,
    BookingListComponent,
    PortalComponent,
    AdminListComponent,
    AddHotelsComponent,
    BookingstatsComponent,
    RevenueStatsComponent,
    ChartsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatOptionModule,
    MatSelectModule,
    NgChartsModule
  ]
})
export class AdminModule { }
