import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from '../adminDashboard/Model/Restaurant';
import { MenuItem } from './Model/MenuItem';

import { Order } from './Model/Order';
import { Discount } from '../adminDashboard/Model/Discount';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http:HttpClient) { 

  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
  




  addMenuItem(menuDTO: object, imageFile: File): Observable<MenuItem> {
    const formData = new FormData();
    formData.append('menuDTOJson', JSON.stringify(menuDTO));
    formData.append('imageFile', imageFile);

    return this.http.post<MenuItem>("http://localhost:8080/api/v1/restaurant/addMenu", formData, {
      headers: this.getHeaders(),
      responseType: 'text' as 'json'
    });
  }


  getMenuItems(adminId: number): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>("http://localhost:8080/api/v1/admin/getAllMenusForManager"+ `/${adminId}`,{ headers: this.getHeaders() });
  }

  deleteMenuItem(menuid: number): Observable<string> {
    return this.http.delete<string>("http://localhost:8080/api/v1/menuItem/deleteMenu" + `/${menuid}`,{ headers: this.getHeaders(), responseType: 'text' as 'json' });
  }

  getOrders(adminId: number): Observable<Order[]> {
    return this.http.get<Order[]>("http://localhost:8080/api/v1/admin/getAllOrders"+ `/${adminId}`,{ headers: this.getHeaders() });
  }

  addDiscount(body: Discount): Observable<Discount> {
    console.log(body);
    return this.http.post<Discount>("http://localhost:8080/api/v1/admin/add-discount", body,{ headers: this.getHeaders() , responseType: 'text' as 'json'});
  }

  removeDiscount(discountid: number): Observable<String> {
    return this.http.delete<String>("http://localhost:8080/api/v1/admin/removeDiscount" + `/${discountid}`,{ headers: this.getHeaders() , responseType: 'text' as 'json'});
  }

  getDiscounts(): Observable<Discount[]> {
    return this.http.get<Discount[]>("http://localhost:8080/api/v1/admin/getAllDiscounts",{ headers: this.getHeaders() });
  }


  getRestaurantsForManager(adminId: number): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>("http://localhost:8080/api/v1/admin/getAllRestaurants"+ `/${adminId}`,{ headers: this.getHeaders() });
  }
}
