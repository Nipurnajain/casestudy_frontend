import { Component } from '@angular/core';
import { Restaurant } from '../adminDashboard/Restaurant';
import { AdminService } from '../adminDashboard/admin.service';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent {
  restaurantList: Restaurant[] = [];
  searchLocation: string = '';
  

  constructor(private adminService: AdminService,private customerService:CustomerService) { }

  ngOnInit(): void {
    this.getAllRestaurants();
  }

  getAllRestaurants() {
    this.adminService.getRestaurants().subscribe((list) => {
      this.restaurantList = list;
      
      }); // Trigger pagination
    }

    searchByLocation() {
      const location = this.searchLocation;
      this.customerService.getRestaurantByLocation(location).subscribe(
        (response) => {
          this.restaurantList = response; // Update the restaurantList with search results by location
        },
        (error) => {
          console.error('Error fetching search results by location:', error);
        }
      );
    }
  }

