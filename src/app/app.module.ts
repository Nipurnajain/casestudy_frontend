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
import { DisplayRestaurantsComponent } from './adminDashboard/display-restaurants/display-restaurants.component'

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
    DisplayRestaurantsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
