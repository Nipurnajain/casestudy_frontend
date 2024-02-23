import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManagerService } from '../manager.service';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/adminDashboard/Restaurant';
import { MenuItem } from '../MenuItem';

@Component({
  selector: 'app-add-menu-items',
  templateUrl: './add-menu-items.component.html',
  styleUrls: ['./add-menu-items.component.css']
})
export class AddMenuItemsComponent {
  registerMenuItemForm!: FormGroup;
  selectedFile!: File;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private managerService: ManagerService, private router: Router) {

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
      restaurantId: ['', [Validators.required]]
    });
  }

  get f() {
    return this.registerMenuItemForm.controls;
  }

  onFileSelected(event: { target: { files: File[]; }; }) {
    this.selectedFile = event.target.files[0] as File;
  }


  insertMenuItem(data: MenuItem) {
    this.managerService.addMenuItem(data)
      .subscribe(
        (menu) => { console.log('Added menu item is: ' + menu);
        this.router.navigate(['/manager-dashboard/display-menuitems']); }
      );


  }


}
