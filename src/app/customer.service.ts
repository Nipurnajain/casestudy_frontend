import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from './adminDashboard/Customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http:HttpClient) { 

  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  addCustomer(body: Customer): Observable<Customer> {

    console.log(body);

    return this.http.post<Customer>("http://localhost:8080/api/v1/customers/register", body,{responseType: 'text' as 'json' }) 

  }



}
