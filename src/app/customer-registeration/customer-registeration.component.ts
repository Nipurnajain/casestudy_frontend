import { Component } from '@angular/core';
import { Customer } from '../adminDashboard/Customer';

@Component({
  selector: 'app-customer-registeration',
  templateUrl: './customer-registeration.component.html',
  styleUrls: ['./customer-registeration.component.css']
})
export class CustomerRegisterationComponent {
  customer: Customer = {
    custId:0,
    custName: '',
    gender: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    addressDTO: {
        houseNo: '',
        area: '',
        landmark: '',
        city: '',
        pincode: 0
    }
};
registerCustomer(formData:any) {
  if (formData.invalid) {
      // Form is invalid, do something (e.g., display error message)
      return;
  }
  
  // Form is valid, proceed with registration logic (e.g., call service to register customer)
}
}
