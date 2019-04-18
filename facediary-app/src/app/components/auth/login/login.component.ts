import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  loginForm: FormGroup;
  constructor(private _formBuilder: FormBuilder,
    private authService: AuthService) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      email: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      password: ['', Validators.required]
    });
    this.loginForm = this._formBuilder.group({})
  }
  login() {
    let email = this.firstFormGroup.value.email
    let password = this.secondFormGroup.value.password
    this.authService.login(email, password)
  }
}