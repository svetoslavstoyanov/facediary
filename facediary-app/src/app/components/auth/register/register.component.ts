import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirthFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder,
    private authService: AuthService) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      email: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      password: ['', Validators.required]
    });
    this.thirthFormGroup = this._formBuilder.group({
      repeatPassword: ['', Validators.required]
    });
    this.registerForm = this._formBuilder.group({})
  }
  register() {
    let email = this.firstFormGroup.value.email
    let password = this.secondFormGroup.value.password
    let repeatPassword = this.thirthFormGroup.value.repeatPassword

    this.authService.registerUser(email, password)
  }
}
