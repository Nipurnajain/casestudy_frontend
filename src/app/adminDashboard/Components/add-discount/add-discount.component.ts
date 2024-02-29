import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { Discount } from '../../Model/Discount';
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
      startDate: ['', [Validators.required,this.startDateValidator]],
      endDate: ['', [Validators.required]]
    }, {
      validator: this.dateValidator
    });
  }
  
  dateValidator(group: FormGroup) {
    const startDate = group.get('startDate')?.value;
    const endDate = group.get('endDate')?.value;

    if (startDate && endDate && startDate > endDate) {
      return { endDateBeforeStartDate: true };
    }

    return null;
  }

  startDateValidator(control: AbstractControl) {
    const startDate = new Date(control.value);
    const currentDate = new Date();

    if (startDate < currentDate) {
      return { startDateBeforeCurrentDate: true };
    }

    return null;
  }

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
