import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent {

  registerRestaurantForm!:FormGroup;
  submitted = false;
  constructor(private formBuilder:FormBuilder) { 

  }

  ngOnInit(){
    this.registerRestaurantForm= this.formBuilder.group({
      restaurantName : ['',[Validators.required,Validators.pattern('^[a-zA-Z\\s]+$')]],
      location : ['',[Validators.required,Validators.pattern('^[a-zA-Z\\s]+$')]],
      contact : ['',[Validators.required,Validators.pattern('[0-9]{10}')]],
      rating :['',[Validators.required,Validators.pattern('[0-5]')]]
    });
  }

  get f(){
    return this.registerRestaurantForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if(this.registerRestaurantForm.invalid){
      return
    }
    alert('SUCCESS!! :-)')
  }
}
