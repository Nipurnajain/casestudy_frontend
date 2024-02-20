import { Component } from '@angular/core';


import { Customer } from '../Customer';
import { AdminService } from '../admin.service';


@Component({
  selector: 'app-display-customers',
  templateUrl: './display-customers.component.html',
  styleUrls: ['./display-customers.component.css']
})
export class DisplayCustomersComponent {

  customerList:Customer[] = [];

  constructor(private adminService: AdminService) { 
    
  }

  ngOnInit(): void {
    this.getAllCustomers();
  }

  getAllCustomers(){
    this.adminService.getCustomers().subscribe( 
                                    (list)=>{ this.customerList = list;  
                                      console.log(list)}
                                    
                                      );

  }

  removeCustomer(resid:number){
    this.adminService.deleteCustomer(resid).subscribe((msg)=>{ console.log("Deleted "+msg);});
    this.getAllCustomers();

  }





}
