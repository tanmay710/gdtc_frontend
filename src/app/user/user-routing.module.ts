import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { BookingsComponent } from './bookings/bookings.component';
import { CheckoutComponent } from './checkout/checkout.component';
const routes: Routes = [
  { path: 'bookings', component: BookingsComponent},
  {path : 'checkout',component : CheckoutComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
