import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Profiles } from '../../../core/models/profile.model';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  profiles: Observable<Profiles[]>

  constructor(private profileService: ProfileService) { }



  ngOnInit() {
    this.profiles = this.profileService.getAllProfiles()

  }

}
