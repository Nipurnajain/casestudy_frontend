import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { JwtClientService } from '../../jwt-client.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  totalCost: number = 0;
  cartItems: any[] = [];
  isPlaceOrderEnabled: boolean = false;

  constructor(private route: ActivatedRoute, private customerService: CustomerService, private jwtClientService: JwtClientService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['cartItems']) {
        this.cartItems = JSON.parse(params['cartItems']);
      }
      if (params['totalCost']) {
        this.totalCost = +params['totalCost']; // Convert to number
      }
    });
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

  placeOrder() {
    const totalCostDouble: number = parseFloat(this.totalCost.toString());
    const menuItems = this.cartItems.map(item => {
      return {
        menuItemId: item.menuItemId,
        quantity: item.quantity
      };
    });

    const requestBody = {
      totalCost: totalCostDouble,
      menuItems: menuItems
    };

    console.log('Request Body:', requestBody);
    this.customerService.placeOrder(
      this.getCustomerIdFromLocalStorage(),
      requestBody
    ).subscribe(
      (response) => {
        console.log('Order placed successfully:', response);
        // Redirect to the order details page after placing the order
        const customerId = this.getCustomerIdFromLocalStorage();
        console.log('Before navigation');
        this.router.navigate(['/orders/', customerId]);
        console.log('After navigation');
      },
      (error) => {
        console.error('Error placing order:', error);
      }
    );
  }



  togglePlaceOrderButton() {
    const codOption = document.getElementById('codOption') as HTMLInputElement;
    this.isPlaceOrderEnabled = codOption.checked;
  }

}
