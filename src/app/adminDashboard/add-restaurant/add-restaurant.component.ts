import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin.service';
import { Restaurant } from '../Restaurant';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent {

  registerRestaurantForm!:FormGroup;
  submitted = false;
  constructor(private formBuilder:FormBuilder,private adminService: AdminService) { 

  }

  ngOnInit(){
    this.registerRestaurantForm= this.formBuilder.group({
      name : ['',[Validators.required,Validators.pattern('^[a-zA-Z\\s]+$')]],
      location : ['',[Validators.required,Validators.pattern('^[a-zA-Z\\s]+$')]],
      contactNumber : ['',[Validators.required,Validators.pattern('[0-9]{10}')]],
      rating :['',[Validators.required,Validators.pattern('[0-5]')]]
    });
  }

  get f(){
    return this.registerRestaurantForm.controls;
  }

  

  insertRestaurant(data:Restaurant){
    this.adminService.addRestaurant(data)
    .subscribe(
            (res)=>{console.log('Added restaurant is: '+res);}
            );;

  }


}
