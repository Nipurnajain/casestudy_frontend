import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { RegisterManagerComponent } from './adminDashboard/register-manager/register-manager.component';
import { DashboardComponent } from './adminDashboard/dashboard/dashboard.component';
import { AddRestaurantComponent } from './adminDashboard/add-restaurant/add-restaurant.component';
import { DisplayCustomersComponent } from './adminDashboard/display-customers/display-customers.component';
import { DisplayManagersComponent } from './adminDashboard/display-managers/display-managers.component';
import { DisplayDiscountComponent } from './adminDashboard/display-discount/display-discount.component';
import { AddDiscountComponent } from './adminDashboard/add-discount/add-discount.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule}  from '@angular/common/http';
import { DisplayRestaurantsComponent } from './adminDashboard/display-restaurants/display-restaurants.component';
import { ManagerDashboardComponent } from './managerDashboard/manager-dashboard/manager-dashboard.component';
import { DisplayOrdersComponent } from './managerDashboard/display-orders/display-orders.component';
import { DisplayMenuItemsComponent } from './managerDashboard/display-menu-items/display-menu-items.component';
import { AddMenuItemsComponent } from './managerDashboard/add-menu-items/add-menu-items.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CustomerLoginComponent } from './customer-login/customer-login.component';
import { CustomerRegisterationComponent } from './customer-registeration/customer-registeration.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { DisplayMenuItemsListComponent } from './display-menu-items-list/display-menu-items-list.component';
import { AddDiscountByManagerComponent } from './managerDashboard/add-discount-by-manager/add-discount-by-manager.component';
import { RouterModule } from '@angular/router';
import { DisplayDiscountManagerComponent } from './managerDashboard/display-discount-manager/display-discount-manager.component';
import { UpdateMenuItemsComponent } from './managerDashboard/update-menu-items/update-menu-items.component';
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    RegisterManagerComponent,
    DashboardComponent,
    AddRestaurantComponent,
    DisplayCustomersComponent,
    DisplayManagersComponent,
    DisplayDiscountComponent,
    AddDiscountComponent,
    DisplayRestaurantsComponent,
    ManagerDashboardComponent,
    DisplayOrdersComponent,
    DisplayMenuItemsComponent,
    AddMenuItemsComponent,
    AdminLoginComponent,
    CustomerLoginComponent,
    CustomerRegisterationComponent,
    CustomerDashboardComponent,
    DisplayMenuItemsListComponent,
    AddDiscountByManagerComponent,
    DisplayDiscountManagerComponent,
    UpdateMenuItemsComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatPaginatorModule,
    RouterModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
