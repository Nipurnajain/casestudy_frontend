import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurant } from '../adminDashboard/Restaurant';
import { MenuItem } from './MenuItem';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private http:HttpClient) { 

  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
  




  addMenuItem(body: MenuItem): Observable<MenuItem> {

    console.log(body);

    return this.http.post<MenuItem>("http://localhost:8080/api/v1/restaurant/addMenu/+ `/${restaurantId}`", body,{ headers: this.getHeaders(), responseType: 'text' as 'json' });

  }
}
