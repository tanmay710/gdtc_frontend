import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HotelsComponent } from './hotels/hotels.component';

import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input'

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    HotelsComponent
  ],
  imports: [
    CommonModule,
    MatOptionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatListModule,
    MatIconModule,
    MatCardModule
  ]
})
export class SharedModule { }
