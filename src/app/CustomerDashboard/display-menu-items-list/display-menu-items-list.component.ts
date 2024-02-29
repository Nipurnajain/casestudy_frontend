import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { JwtClientService } from '../../jwt-client.service';
import { MenuItem } from '../../managerDashboard/Model/MenuItem';

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
  selectedCategory: string = '';
  selectedPriceRange: string = ''; 


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

  // filterByCategory() {
  //   // Make a copy of the original menu items
  //   const originalMenuItemsCopy = [...this.menuItems];
  
  //   // If no category is selected, reset the filtered menu items to all menu items
  //   if (!this.selectedCategory) {
  //     this.menuItems = originalMenuItemsCopy;
  //   } else {
  //     // Filter menu items by the selected category
  //     this.menuItems = originalMenuItemsCopy.filter(item => item.category === this.selectedCategory);
  //   }
  // }


   
  filterByCategory() {
    this.customerService.searchMenuByCategory(this.restaurantId, this.selectedCategory)
      .subscribe(
        (response) => {
          this.menuItems = response;
          // Assuming you need to decode image data here
          this.menuItems.forEach(item => {
            item.decodedImage = 'data:image/jpeg;base64,' + item.image;
          });
        },
        (error) => {
          console.error('Error fetching menu items:', error);
        }
      );
  }

  sortByPriceRange() {
    console.log('Sorting by price range...');
    const [minPrice, maxPrice] = this.selectedPriceRange.split('-').map(Number);
    
    // Call the service method to get menu items by price range
    this.customerService.getMenuByPriceRange(this.restaurantId, minPrice, maxPrice)
    .subscribe(
      (response) => {
        this.menuItems = response;
       
        this.menuItems.forEach(item => {
          item.decodedImage = 'data:image/jpeg;base64,' + item.image;
          console.log('Response from getMenuByPriceRange:', response);
        });
      },
      (error) => {
        console.error('Error fetching menu items:', error);
      }
    );
  }

  applyFilters() {
    // Fetch menu items based on the updated filters
    this.fetchMenuItems();
  }
}
