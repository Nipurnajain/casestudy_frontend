import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Discount } from 'src/app/adminDashboard/Discount';
import { AdminService } from 'src/app/adminDashboard/admin.service';
import { ManagerService } from '../manager.service';

@Component({
  selector: 'app-add-discount-by-manager',
  templateUrl: './add-discount-by-manager.component.html',
  styleUrls: ['./add-discount-by-manager.component.css']
})
export class AddDiscountByManagerComponent {

  registerDiscountForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private managerService: ManagerService,private router:Router) {}

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
    this.managerService.addDiscount(data)
      .subscribe(
        (discount) => {
          console.log('Added discount is: ' + discount);
          this.router.navigate(['manager-dashboard/display-discount']);
        }
      );
  }

}
