import { Component } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-manager',
  templateUrl: './register-manager.component.html',
  styleUrls: ['./register-manager.component.css']
})
export class RegisterManagerComponent {
  registerForm!:FormGroup;
  submitted = false;
  constructor(private formBuilder:FormBuilder) { 

  }

  ngOnInit(){
    this.registerForm= this.formBuilder.group({
      fullName : ['',[Validators.required,Validators.pattern('^[a-zA-Z\\s]+$')]],
      email : ['',[Validators.required,Validators.email]],
      username : ['',[Validators.required,Validators.pattern('^[a-zA-Z0-9_]+$')]],
      password :['',[Validators.required,Validators.minLength(6)]]
    });
  }

  get f(){
    return this.registerForm.controls;
  }

  onSubmit(){
    this.submitted = true;
    if(this.registerForm.invalid){
      return
    }
    alert('SUCCESS!! :-)')
  }


}
