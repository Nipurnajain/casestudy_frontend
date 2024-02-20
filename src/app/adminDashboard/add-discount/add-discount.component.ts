import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { Discount } from '../Discount';


@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.css']
})
export class AddDiscountComponent {


  registerDiscountForm!:FormGroup;
  submitted = false;
  constructor(private formBuilder:FormBuilder,private adminService: AdminService) { 

  }

  ngOnInit(){
    this. registerDiscountForm= this.formBuilder.group({
      discountPercentage : ['',[Validators.required]],
      startDate: ['',[Validators.required]],
      endDate : ['',[Validators.required]],
      
    });
  }

  get f(){
    return this. registerDiscountForm.controls;
  }

  

  insertDiscount(data:Discount){
    this.adminService.addDiscount(data)
    .subscribe(
            (discount)=>{console.log('Added discount is: '+discount);}
            );;

  }



}
