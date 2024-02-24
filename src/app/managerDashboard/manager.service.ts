import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from '../adminDashboard/Restaurant';
import { MenuItem } from './MenuItem';

import { Order } from './Order';

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
      // Note: responseType is not necessary unless you have specific requirements
      // responseType: 'text' as 'json',
    });
  }


  getMenuItems(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>("http://localhost:8080/api/v1/admin/getAllMenus",{ headers: this.getHeaders() });
  }

  deleteMenuItem(menuid: number): Observable<string> {
    return this.http.delete<string>("http://localhost:8080/api/v1/restaurant/deleteMenu" + `/${menuid}`,{ headers: this.getHeaders(), responseType: 'text' as 'json' });
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>("http://localhost:8080/api/v1/admin/getAllOrders",{ headers: this.getHeaders() });
  }
}
