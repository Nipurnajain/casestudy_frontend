import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from './Restaurant';
import { Observable } from 'rxjs';
import { Discount } from './Discount';
import { Manager } from './Manager';
import { Customer } from './Customer';


@Injectable({
  providedIn: 'root'
})
export class AdminService {


  constructor(private http:HttpClient) { 

  }

  // register manager

  // add restaurant , remove and display all,

  // get all customers/users

  // add & remove discount
  addRestaurant(body: Restaurant): Observable<Restaurant> {

    console.log(body);

    return this.http.post<Restaurant>("http://localhost:8080/api/v1/restaurant/register", body);

  }

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>("http://localhost:8080/api/v1/admin/getAllRestaurants");
  }

  deleteRestaurant(resid: number): Observable<string> {
    return this.http.delete<string>("http://localhost:8080/api/v1/admin/removeRestaurant" + `/${resid}`);
  }

  addDiscount(body: Discount): Observable<Discount> {
    console.log(body);
    return this.http.post<Discount>("http://localhost:8080/api/v1/admin/add-discount", body);
  }

  removeDiscount(discountid: number): Observable<String> {
    return this.http.delete<String>("http://localhost:8080/api/v1/admin/removeDiscount" + `/${discountid}`);
  }

  getDiscounts(): Observable<Discount[]> {
    return this.http.get<Discount[]>("http://localhost:8080/api/v1/admin/getAllDiscounts");
  }



  addManager(body:Manager):Observable<Manager>{
    console.log(body);
    return this.http.post<Manager>("http://localhost:8080/api/v1/admin/register",body);

  }
  getManagers():Observable<Manager[]>{
    return this.http.get<Manager[]>("http://localhost:8080/api/v1/admin/getAllManagers");
  }

  deleteManager(mid:number):Observable<string>{
    return this.http.delete<string>("http://localhost:8080/api/v1/admin/removeManager"+`/${mid}`);
  }

  getCustomers():Observable<Customer[]>{
    return this.http.get<Customer[]>("http://localhost:8080/api/v1/admin/getAllCustomers");
  }

  deleteCustomer(custid:number):Observable<string>{
    return this.http.delete<string>("http://localhost:8080/api/v1/admin/removeCustomer"+`/${custid}`);
  }


}
