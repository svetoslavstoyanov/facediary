import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/core/services/profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  personalInfo: FormGroup
  profile
  constructor(private _formBuilder: FormBuilder,
    private profileService: ProfileService,
    private router: Router,
    private toastr: MatSnackBar
  ) { }

  ngOnInit() {
    this.profileService.getPersonalProfile().subscribe(data => {
      this.profile = data[0]

      this.personalInfo = this._formBuilder.group({
        name: [this.profile.name, Validators.required],
        surname: [this.profile.surname, Validators.required],
        profilePhoto: [this.profile.profilePhoto, Validators.required],
        coverPhoto: [this.profile.coverPhoto, Validators.required],
        emailProfile: [this.profile.emailProfile, Validators.required],
        location: [this.profile.location, Validators.required],
        birthday: [this.profile.birthday, Validators.required],
        bio: [this.profile.bio, Validators.required]
      })
    })
  }
  editProfile() {
    let body = {
      [this.profile.id]: this.personalInfo.value
    }
    this.profileService.editProfile(body).subscribe(data => {
      this.router.navigate(['/Ownprofile']);
      this.toastr.open('Successfully updated!', '', {
        duration: 1000
      })
    })
  }
}
