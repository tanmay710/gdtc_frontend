import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { HotelsComponent } from './shared/hotels/hotels.component';
import { AboutComponent } from './shared/about/about.component';
import { ContactComponent } from './shared/contact/contact.component';
const routes: Routes = [{ path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
{ path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
{ path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
{ path: '', component: HomeComponent },
{ path: 'hotels', component: HotelsComponent },
{path: 'about', component : AboutComponent},
{path : 'contact',component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
