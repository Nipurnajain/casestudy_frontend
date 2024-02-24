import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManagerService } from '../manager.service';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/adminDashboard/Restaurant';
import { MenuItem } from '../MenuItem';
<<<<<<< HEAD
=======
import { AdminService } from 'src/app/adminDashboard/admin.service';
>>>>>>> 4287ac6cd73aef0e1acd01540451c9b80797ba7c

@Component({
  selector: 'app-add-menu-items',
  templateUrl: './add-menu-items.component.html',
  styleUrls: ['./add-menu-items.component.css']
})
export class AddMenuItemsComponent {
  registerMenuItemForm!: FormGroup;
  selectedFile!: File;
  submitted = false;
<<<<<<< HEAD
  constructor(private formBuilder: FormBuilder, private managerService: ManagerService, private router: Router) {
=======
  restaurants: Restaurant[] = []; // Array to hold the list of restaurants
  constructor(private formBuilder: FormBuilder, private managerService: ManagerService, private router: Router,private adminService: AdminService) {
>>>>>>> 4287ac6cd73aef0e1acd01540451c9b80797ba7c

  }

  ngOnInit() {
    this.registerMenuItemForm= this.formBuilder.group({
      itemName: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]],
      description: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]],
      category: ['', [Validators.required]],
      price: ['', [Validators.required]],
      availabilityTime: ['', [Validators.required]],
      specialDietaryInfo: ['', [Validators.required]],
      tasteInfo:['', [Validators.required]],
      nutritionalInfo: ['', [Validators.required]],
      cookingTime: ['', [Validators.required]],
      restaurantId: ['', [Validators.required]],
      // Add a new form control for the file
      image: [null, [Validators.required]],
    });
<<<<<<< HEAD
  }
=======

    this.adminService.getRestaurants().subscribe(
      (restaurants: Restaurant[]) => {
        this.restaurants = restaurants;
      },
      (error) => {
        console.error('Error fetching restaurants:', error);
      }
    );
  }
  

  
>>>>>>> 4287ac6cd73aef0e1acd01540451c9b80797ba7c

  get f() {
    return this.registerMenuItemForm.controls;
  }


  
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      this.selectedFile = inputElement.files[0];
      this.registerMenuItemForm.patchValue({
        image: this.selectedFile,
      });
    }
  }

  insertMenuItem() {
    this.submitted = true;

    if (this.registerMenuItemForm.invalid) {
      return;
    }

    const menuDTO = {
      itemName: this.f['itemName'].value,
      description: this.f['description'].value,
      category: this.f['category'].value,
      price: this.f['price'].value,
      availabilityTime: this.f['availabilityTime'].value,
      specialDietaryInfo: this.f['specialDietaryInfo'].value,
      tasteInfo: this.f['tasteInfo'].value,
      nutritionalInfo: this.f['nutritionalInfo'].value,
      cookingTime: this.f['cookingTime'].value,
      restaurantId: this.f['restaurantId'].value,
    };

    this.managerService.addMenuItem(menuDTO, this.selectedFile).subscribe(
      (menu) => {
        console.log('Added menu item is: ', menu);
        this.router.navigate(['/manager-dashboard/display-menuitems']);
      },
      (error) => {
        console.error('Error adding menu item:', error);
      }
    );
  }


}
