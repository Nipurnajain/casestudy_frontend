import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from './adminDashboard/Customer';
import { Observable } from 'rxjs';
import { Restaurant } from './adminDashboard/Restaurant';
import { MenuItem } from './managerDashboard/MenuItem';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http:HttpClient) { 

  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  addCustomer(body: Customer): Observable<Customer> {

    console.log(body);

    return this.http.post<Customer>("http://localhost:8080/api/v1/customers/register", body,{responseType: 'text' as 'json' }) 

  }

  getRestaurantByLocation(location:string): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>("http://localhost:8080/api/v1/restaurant/searchByLocation"+`/${location}`,{ headers: this.getHeaders() });
    
}

getMenuItemsByRestaurantId(restaurantId:number):Observable<any[]>{
  return this.http.get<any[]>("http://localhost:8080/api/v1/menuItem/getByRestaurant"+`/${restaurantId}`,{ headers: this.getHeaders() });
}

searchMenuByKeyword(keyword:string):Observable<MenuItem[]>{
  return this.http.get<MenuItem[]>("http://localhost:8080/api/v1/menuItem/getByKeyword"+`/${keyword}`,{ headers: this.getHeaders() });
  
}
}
