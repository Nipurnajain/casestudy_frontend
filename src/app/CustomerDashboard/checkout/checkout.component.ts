import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { JwtClientService } from '../../Security/jwt-client.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  cardPaymentDetails = {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: ''
  };

  totalCost: number = 0;
  cartItems: any[] = [];
  selectedPaymentOption!: string; // Property to track the selected payment option
  isPlaceOrderEnabled: boolean = false; // Property to control the visibility of the "Place Order" button

  togglePlaceOrderButton() {
    // Logic to determine if the "Place Order" button should be enabled
    this.isPlaceOrderEnabled = this.selectedPaymentOption === 'cod';
  }

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
    if (this.selectedPaymentOption === 'cod') {
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
    
    else if (this.selectedPaymentOption === 'card-payment') {
      // Handle Card Payment
      const totalCostDouble: number = parseFloat(this.totalCost.toString());
      const menuItems = this.cartItems.map(item => {
        return {
          menuItemId: item.menuItemId,
          quantity: item.quantity
        };
      });
  
      const cardPaymentDetails = this.cardPaymentDetails; // Get card payment details
  
      const requestBody = {
        amount: totalCostDouble,
        paymentMethod: 'Card',
        cardNumber: cardPaymentDetails.cardNumber,
        expiryDate: cardPaymentDetails.expiryDate,
        cvv: cardPaymentDetails.cvv,
        cardHolder: cardPaymentDetails.cardHolder,
        totalCost: this.totalCost,
        menuItems: menuItems
      };
  
      console.log('Card Payment Request Body:', requestBody);
      this.customerService.makePaymentRequest(
        this.getCustomerIdFromLocalStorage(),
        requestBody
      ).subscribe(
        (response) => {
          console.log('Payment processed successfully:', response);
          // Redirect to the order details page after processing payment
          const customerId = this.getCustomerIdFromLocalStorage();
          console.log('Before navigation');
          this.router.navigate(['/orders', customerId]);
          console.log('After navigation');
        }
      );
    }
    
  }



  

}
