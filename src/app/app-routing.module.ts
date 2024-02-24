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
import { ManagerDashboardComponent } from './managerDashboard/manager-dashboard/manager-dashboard.component';
import { AddMenuItemsComponent } from './managerDashboard/add-menu-items/add-menu-items.component';
import { DisplayMenuItemsComponent } from './managerDashboard/display-menu-items/display-menu-items.component';
import { DisplayOrdersComponent } from './managerDashboard/display-orders/display-orders.component';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerRegisterationComponent } from './customer-registeration/customer-registeration.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';

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
  {
    path: 'manager-dashboard',
    component: ManagerDashboardComponent,
    canActivate: [AuthGuardService],
    data: { expectedRole: 'manager' },
    children: [
      { path: 'add-menu', component: AddMenuItemsComponent },
      {path:'display-menuitems',component:DisplayMenuItemsComponent},
      {path:'display-orders',component:DisplayOrdersComponent},
      { path: 'add-discounts', component: AddDiscountComponent },
      { path: 'display-discounts', component: DisplayDiscountComponent },

       { path: 'add-discounts', component: AddDiscountComponent },

     
    ],
  },
  { path: '', pathMatch: 'full', redirectTo: 'landing-page' }, // Redirect to admin-login by default

  {path:'admin-login',component:AdminLoginComponent},
  {path:'landing-page',component:LandingComponent},
  {path:'customer-login',component:CustomerLoginComponent},
  {path:'customer-register',component:CustomerRegisterationComponent},
  {path:'customer-dashboard',component:CustomerDashboardComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
