import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-profile-personal',
  templateUrl: './profile-personal.component.html',
  styleUrls: ['./profile-personal.component.css']
})
export class ProfilePersonalComponent implements OnInit {
  profileOwn
  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileOwn = this.profileService.getPersonalProfile()
  }

}
