import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';

import { AdminService } from '../admin.service';
import { Manager } from '../Manager';

@Component({
  selector: 'app-register-manager',
  templateUrl: './register-manager.component.html',
  styleUrls: ['./register-manager.component.css']
})
export class RegisterManagerComponent {

  registerManagerForm!:FormGroup;
  submitted = false;
  constructor(private formBuilder:FormBuilder,private adminService: AdminService) { 

  }

  ngOnInit(){

    this.registerManagerForm= this.formBuilder.group({
      name : ['',[Validators.required,Validators.pattern('^[a-zA-Z\\s]+$')]],
      email : ['',[Validators.required,Validators.email]],
      userName : ['',[Validators.required,Validators.pattern('^[a-zA-Z0-9_]+$')]],
      password :['',[Validators.required,Validators.minLength(6)]]
    });
  }

  get f(){
    return this.registerManagerForm.controls;
  }



  registerManager(data:Manager){
    this.adminService.addManager(data)
    .subscribe(
            (res)=>{console.log('Added manager is: '+res);}
            );;

  }


}
