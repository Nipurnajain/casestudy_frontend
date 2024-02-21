import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterManagerComponent } from './adminDashboard/register-manager/register-manager.component';
import { DashboardComponent } from './adminDashboard/dashboard/dashboard.component';
import { AddRestaurantComponent } from './adminDashboard/add-restaurant/add-restaurant.component';
import { DisplayRestaurantsComponent } from './adminDashboard/display-restaurants/display-restaurants.component';
import { AddDiscountComponent } from './adminDashboard/add-discount/add-discount.component';
import { DisplayDiscountComponent } from './adminDashboard/display-discount/display-discount.component';

import { DisplayCustomersComponent } from './adminDashboard/display-customers/display-customers.component';
import { DisplayManagersComponent } from './adminDashboard/display-managers/display-managers.component';
import { LandingComponent } from './landing/landing.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  {
    path: 'admin-dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    data: { expectedRole: 'admin' },
    children: [
      { path: 'register-manager', component: RegisterManagerComponent },
      { path: 'add-restaurant', component: AddRestaurantComponent },
      { path: 'display-restaurant', component: DisplayRestaurantsComponent },
      { path: 'add-discounts', component: AddDiscountComponent },
      { path: 'display-discounts', component: DisplayDiscountComponent },
      { path: 'display-customers', component: DisplayCustomersComponent },
      { path: 'display-managers', component: DisplayManagersComponent },
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: 'admin-login' }, // Redirect to admin-login by default

  {path:'admin-login',component:AdminLoginComponent},
  {path:'login',component:LandingComponent},
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
