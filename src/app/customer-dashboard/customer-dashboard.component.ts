import { Component } from '@angular/core';
import { Restaurant } from '../adminDashboard/Restaurant';
import { AdminService } from '../adminDashboard/admin.service';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';
import { JwtClientService } from '../jwt-client.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent {
  restaurantList: Restaurant[] = [];
  searchLocation: string = '';
  

  constructor(private adminService: AdminService,private customerService:CustomerService,private router:Router
    ,private jwtClientService :JwtClientService) { }

  ngOnInit(): void {
    this.getAllRestaurants();
  }

  getAllRestaurants() {
    this.adminService.getRestaurants().subscribe((list) => {
      this.restaurantList = list;
      console.log(list);
      }); // Trigger pagination
    }

    searchByLocation() {
      const location = this.searchLocation;
      this.customerService.getRestaurantByLocation(location).subscribe(
        (response) => {
          this.restaurantList = response; // Update the restaurantList with search results by location
          console.log(response);
        },
        (error) => {
          console.error('Error fetching search results by location:', error);
        }
      );
    }

    showMenuItems(restaurantId: number) {
      // Navigate to the MenuItemsComponent with the restaurantId as a parameter
      this.router.navigate(['/menu-items', restaurantId]);
    }

    logout(): void {

      this.jwtClientService.clearStoredToken();
      // Redirect to the login page
      this.router.navigate(['/landing-page']);
    }
    
  
  }

