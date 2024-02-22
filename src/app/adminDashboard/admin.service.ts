import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from './Restaurant';
import { Observable } from 'rxjs';
import { Discount } from './Discount';
import { Manager } from './Manager';
import { Customer } from './Customer';
import { JwtClientAdminService } from '../jwt-client-admin.service';


@Injectable({
  providedIn: 'root'
})
export class AdminService {


  constructor(private http:HttpClient) { 

  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('jwtToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
  




  addRestaurant(body: Restaurant): Observable<Restaurant> {

    console.log(body);

    return this.http.post<Restaurant>("http://localhost:8080/api/v1/restaurant/register", body,{ headers: this.getHeaders() });

  }

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>("http://localhost:8080/api/v1/admin/getAllRestaurants",{ headers: this.getHeaders() });
  }

  deleteRestaurant(resid: number): Observable<string> {
    return this.http.delete<string>("http://localhost:8080/api/v1/admin/removeRestaurant" + `/${resid}`,{ headers: this.getHeaders() });
  }

  addDiscount(body: Discount): Observable<Discount> {
    console.log(body);
    return this.http.post<Discount>("http://localhost:8080/api/v1/admin/add-discount", body,{ headers: this.getHeaders() });
  }

  removeDiscount(discountid: number): Observable<String> {
    return this.http.delete<String>("http://localhost:8080/api/v1/admin/removeDiscount" + `/${discountid}`,{ headers: this.getHeaders() });
  }

  getDiscounts(): Observable<Discount[]> {
    return this.http.get<Discount[]>("http://localhost:8080/api/v1/admin/getAllDiscounts",{ headers: this.getHeaders() });
  }



  addManager(body:Manager):Observable<Manager>{
    console.log(body);
    return this.http.post<Manager>("http://localhost:8080/api/v1/admin/register",body,{ headers: this.getHeaders() });

  }
  getManagers():Observable<Manager[]>{
    return this.http.get<Manager[]>("http://localhost:8080/api/v1/admin/getAllManagers",{ headers: this.getHeaders() });
  }

  deleteManager(mid:number):Observable<string>{
    return this.http.delete<string>("http://localhost:8080/api/v1/admin/removeManager"+`/${mid}`,{ headers: this.getHeaders() });
  }

  getCustomers():Observable<Customer[]>{
    return this.http.get<Customer[]>("http://localhost:8080/api/v1/admin/getAllCustomers",{ headers: this.getHeaders() });
  }

  deleteCustomer(custid:number):Observable<string>{
    return this.http.delete<string>("http://localhost:8080/api/v1/admin/removeCustomer"+`/${custid}`,{ headers: this.getHeaders() });
  }


}
