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

  discountApplied: boolean = false;

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
    this.fetchCartDetails();
    // Retrieve discountApplied state from localStorage on page load
    const storedDiscountApplied = localStorage.getItem('discountApplied');
    this.discountApplied = storedDiscountApplied === 'true';
    
  }

  private fetchCartDetails(): void{
    const customerId = this.getCustomerIdFromLocalStorage();
  
    // Call the service method to get cart details
    this.customerService.getCartDetails(customerId).subscribe(
      (data) => {
        this.cartItems = data;
        console.log(this.cartItems);
  
        // Assign totalCost from the 'total' property of the first item in cartItems
        if (this.cartItems.length > 0 && 'total' in this.cartItems[0]) {
          this.totalCost = this.cartItems[0].total;
          console.log(this.totalCost);
        }
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
    localStorage.clear();
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

    localStorage.setItem('discountApplied', 'false');
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

      localStorage.setItem('discountApplied', 'false');
    }
    
  }


  applyDiscount() {
    const customerId = this.getCustomerIdFromLocalStorage();
  
    // Call the service method
    this.customerService.applyDiscount(customerId).subscribe(
      (response) => {
        // Handle the successful response, if needed
        console.log('Discount applied successfully:', response);
  
        // Your additional logic after applying the discount
        this.discountApplied = true;

        // Store discountApplied state in localStorage
        localStorage.setItem('discountApplied', 'true');

        this.fetchCartDetails();
      },
      (error) => {
        // Handle the error, if needed
        console.error('Error applying discount:', error);
      }
    );
  }
  
  cancelOrder(){
   
    const customerId = this.getCustomerIdFromLocalStorage();
  
    // Call the service method
    this.customerService.clearCart(customerId).subscribe(
      (response) => {
       
        console.log('cart cleared :', response);

       
        localStorage.setItem('discountApplied', 'true');

        
      },
      (error) => {
        
        console.error('Error applying discount:', error);
      }
    );
    this.router.navigate(['/customer-dashboard']);
    
  }
  

}
