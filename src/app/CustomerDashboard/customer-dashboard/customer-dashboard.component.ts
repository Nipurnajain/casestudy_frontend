import { Component } from '@angular/core';
import { Restaurant } from '../../adminDashboard/Model/Restaurant';
import { AdminService } from '../../adminDashboard/admin.service';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';
import { JwtClientService } from '../../Security/jwt-client.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent {
  restaurantList: Restaurant[] = [];
  searchLocation: string = '';
  filteredRestaurantList: Restaurant[] = [];
  

  constructor(private adminService: AdminService,private customerService:CustomerService,private router:Router
    ,private jwtClientService :JwtClientService) { }

  ngOnInit(): void {
    this.getAllRestaurants();
  }

  getAllRestaurants() {
    this.adminService.getRestaurants().subscribe(
      (list) => {
      this.restaurantList = list;
      this.filteredRestaurantList = this.restaurantList.filter(restaurant => restaurant.restaurantId !== 601);
      console.log('Retrieved all restaurants:', list);
          }); // Trigger pagination
    }

    searchByLocation() {
      const location = this.searchLocation;
      this.customerService.getRestaurantByLocation(location).subscribe(
        (response) => {
          this.restaurantList = response; // Update the restaurantList with search results by location
          console.log(response);
          this.filteredRestaurantList = this.restaurantList.filter(restaurant => restaurant.restaurantId !== 601);
        },
        (error) => {
          console.error('Error fetching search results by location:', error);
          alert('No restaurant available for this location');

        }
      );
    }

    showMenuItems(restaurantId: number) {
      // Navigate to the MenuItemsComponent with the restaurantId as a parameter
      this.router.navigate(['/menu-items', restaurantId]);
    }

    logout(): void {

      this.jwtClientService.clearStoredToken();
      localStorage.clear();
      // Redirect to the login page
      this.router.navigate(['/landing-page']);
    }

    getFirstMenuItemImage(menuItems: any[]): string {
      const firstMenuItem = menuItems[0];
      
      if (firstMenuItem && firstMenuItem.image) {
        // Assuming firstMenuItem.image is a base64-encoded string
        return 'data:image/jpeg;base64,' + firstMenuItem.image; 
      } else {
        return 'default-image-url.jpg';
      }
    }
    
    getCustomerIdFromLocalStorage(): string | null {
      // Retrieve customer ID from localStorage
      const customerId = localStorage.getItem('customerId');
  
      // Return the customer ID or a default value if not found
      return customerId ;
    }
  
  }

