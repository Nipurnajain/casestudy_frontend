import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterManagerComponent } from './adminDashboard/register-manager/register-manager.component';
import { DashboardComponent } from './adminDashboard/dashboard/dashboard.component';
import { AddRestaurantComponent } from './adminDashboard/add-restaurant/add-restaurant.component';
import { DisplayRestaurantsComponent } from './adminDashboard/display-restaurants/display-restaurants.component';

const routes: Routes = [
  { path: 'register-manager', component: RegisterManagerComponent },
  {path:'add-restaurant',component:AddRestaurantComponent},
  {path:'display-restaurant',component:DisplayRestaurantsComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
