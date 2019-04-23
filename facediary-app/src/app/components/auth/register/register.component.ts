import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../../core/services/auth.service';
import { ProfileService } from 'src/app/core/services/profile.service';

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
  personalInfo: FormGroup
  constructor(private _formBuilder: FormBuilder,
    private authService: AuthService, private profileService: ProfileService) { }

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
    this.personalInfo = this._formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      profilePhoto: ['', Validators.required],
      coverPhoto: ['', Validators.required],
      emailProfile: ['', Validators.required],
      location: ['', Validators.required],
      birthday: ['', Validators.required],
      bio: ['', Validators.required]
    })
    this.registerForm = this._formBuilder.group({})

  }
  register() {
    let email = this.firstFormGroup.value.email
    let password = this.secondFormGroup.value.password
    let repeatPassword = this.thirthFormGroup.value.repeatPassword

    this.profileService.createProfile(this.personalInfo.value).subscribe()
    this.authService.register(email, password)
  }
}
