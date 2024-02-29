import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { JwtClientService } from '../../Security/jwt-client.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartDetails: any[] = [];



  constructor(private route: ActivatedRoute, private customerService: CustomerService, private jwtClientService: JwtClientService
    , private router: Router) { }

  ngOnInit() {
    this.refreshCartDetails();
  }

  refreshCartDetails() {
    const customerId = this.getCustomerIdFromLocalStorage();
    this.customerService.getCartDetails(customerId).subscribe(
      (data) => {
        this.cartDetails = data;
      },
      (error) => {
        console.error('Error fetching cart details:', error);
      }
    );
  }

  getCustomerIdFromLocalStorage(): number {
    // Retrieve customer ID from localStorage
    const customerId = localStorage.getItem('customerId');

    return customerId ? parseInt(customerId, 10) : 0;
  }

  logout(): void {

    this.jwtClientService.clearStoredToken();
    // Redirect to the login page
    this.router.navigate(['/landing-page']);
  }

  formatCurrency(value: number): string {
    return value !== undefined ? value.toFixed(2) : '0.00';
  }

  incrementQuantity(item: any): void {
    const cartItem = {
      menuItemId: item.menuItemId,
      quantity: item.quantity,
      price: item.price,
    };

    this.customerService.addToCart(cartItem, this.getCustomerIdFromLocalStorage()).subscribe(
      (response) => {
        console.log('Item added to cart:', response);
        this.refreshCartDetails(); // Reload the page after adding to cart
      },
      (error) => {
        console.error('Error adding to cart:', error);
      }
    );
  }

  decrementQuantity(item: any): void {
    this.customerService.removeFromCart(item.menuItemId, this.getCustomerIdFromLocalStorage()).subscribe(
      (response) => {
        console.log('Item removed from cart:', response);
        this.refreshCartDetails(); // Reload the page after removing from cart
      },
      (error) => {
        console.error('Error removing from cart:', error);
      }
    );
  }

  

  checkout() {
    const totalCost = this.cartDetails.length > 0 ? this.cartDetails[0].total : 0;

    this.router.navigate(['/checkout'], { 
      queryParams: { 
        cartItems: JSON.stringify(this.cartDetails),
        totalCost: totalCost
      } 
    });
  }
}
