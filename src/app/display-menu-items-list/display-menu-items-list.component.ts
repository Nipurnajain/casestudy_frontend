import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { JwtClientService } from '../jwt-client.service';
import { MenuItem } from '../managerDashboard/MenuItem';

@Component({
  selector: 'app-display-menu-items-list',
  templateUrl: './display-menu-items-list.component.html',
  styleUrls: ['./display-menu-items-list.component.css']
})
export class DisplayMenuItemsListComponent {
  restaurantId!: number;
  menuItems: any[] = [];
  searchMenu: string = '';
  isRemoveButtonDisabled = true;
  showOnlyVegetarian: boolean = false; 
  

  constructor(private route: ActivatedRoute, private customerService: CustomerService,private jwtClientService :JwtClientService
    ,private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.restaurantId = params['restaurantId'];
      this.fetchMenuItems();
    });
  }

  fetchMenuItems() {
    // Fetch menu items based on the restaurantId
    this.customerService.getMenuItemsByRestaurantId(this.restaurantId, this.showOnlyVegetarian).subscribe(
      (response) => {
        // Filter menu items based on showOnlyVegetarian flag
        if (this.showOnlyVegetarian) {
          // Filter only vegetarian items
          this.menuItems = response.filter(item => item.specialDietaryInfo && item.specialDietaryInfo.toLowerCase() === 'veg');
        } else {
          // Display all menu items
          this.menuItems = response;
        }
        this.menuItems.forEach(item => {
          item.decodedImage = 'data:image/jpeg;base64,' + item.image; // Assuming default format is JPEG
        });
      },
      (error) => {
        console.error('Error fetching menu items:', error);
      }
    );
  }
  
  getMenuByKeyword(){
    const keyword = this.searchMenu;
    this.customerService.searchMenuByKeyword(this.restaurantId,keyword)
    .subscribe((list) => {
      this.menuItems= list;

      this.menuItems.forEach(item => {
        item.decodedImage = 'data:image/jpeg;base64,' + item.image; // Assuming default format is JPEG
      });
      console.log(list);
      });
  }

  logout(): void {

    this.jwtClientService.clearStoredToken();
    // Redirect to the login page
    this.router.navigate(['/landing-page']);
  }


  addToCart(menuItemId: number, price: number) {
    const customerId = Number(localStorage.getItem('customerId'));

    if (customerId) {
      // Set default quantity to 1
      const defaultQuantity = 1;

      // Create an object with the required properties
      const cartItem = {
        menuItemId,
        quantity: defaultQuantity,
        price
      };

      this.customerService.addToCart(cartItem, customerId).subscribe(
        response => {
          // Handle successful response (if needed)
          console.log(response);
        },
        error => {
          // Handle error (if needed)
          console.error(error);
        }
      );
    } else {
      console.error('customerId is not available in localStorage');
    }
  }

  getCustomerIdFromLocalStorage(): string | null {
    // Retrieve customer ID from localStorage
    const customerId = localStorage.getItem('customerId');

    // Return the customer ID or a default value if not found
    return customerId ;
  }

  // removeFromCart() {
  //   // Your logic to remove the item from the cart
  //   // ...

  //   // Enable Add to Cart button and disable Remove button
  //   this.isRemoveButtonDisabled = true;
  // }



  toggleVegNonVeg(): void {
    // Fetch menu items based on the updated showOnlyVegetarian value
    this.fetchMenuItems();
  }
}
