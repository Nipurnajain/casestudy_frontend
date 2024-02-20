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

const routes: Routes = [
  { path: 'register-manager', component: RegisterManagerComponent },
  {path:'add-restaurant',component:AddRestaurantComponent},
  {path:'display-restaurant',component:DisplayRestaurantsComponent},
  {path:'add-discounts',component:AddDiscountComponent},
  {path:'display-discounts',component:DisplayDiscountComponent},
  {path:'display-customers',component:DisplayCustomersComponent},
  {path:'display-managers',component:DisplayManagersComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
