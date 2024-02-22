import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AdminService } from '../admin.service';
import { Discount } from '../Discount';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.css']
})
export class AddDiscountComponent implements OnInit {
  registerDiscountForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private adminService: AdminService,private router:Router) {}

  ngOnInit() {
    this.registerDiscountForm = this.formBuilder.group({
      discountPercentage: ['', [Validators.required]],
      startDate: ['', [Validators.required ]],
      endDate: ['', [Validators.required]]
    });
  }

  // private startDateValidator(control: AbstractControl) {
  //   const startDate = new Date(control.value);
  //   const currentDate = new Date();
  //   if (startDate <= currentDate) {
  //     return { 'startDateInvalid': true };
  //   }
  //   return null;
  // }

  // private endDateValidator(control: AbstractControl) {
  //   const startDateControl = this.registerDiscountForm.get('startDate');
  //   if (!startDateControl || !startDateControl.value) return null; // Check if startDateControl or its value is undefined
  //   const startDate = new Date(startDateControl.value);
  //   const endDate = new Date(control.value);
  //   if (endDate <= startDate) {
  //     return { 'endDateInvalid': true };
  //   }
  //   return null;
  // }

  get f() {
    return this.registerDiscountForm.controls;
  }

  insertDiscount(data: Discount) {
    this.adminService.addDiscount(data)
      .subscribe(
        (discount) => {
          console.log('Added discount is: ' + discount);
          this.router.navigate(['admin-dashboard/display-discounts']);
        }
      );
  }
}
