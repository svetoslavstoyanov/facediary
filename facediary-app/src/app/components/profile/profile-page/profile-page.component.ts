import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  profiles: any
  isAdmin: boolean = false

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getAllProfiles()
      .subscribe(data => this.profiles = data)
  }
}
