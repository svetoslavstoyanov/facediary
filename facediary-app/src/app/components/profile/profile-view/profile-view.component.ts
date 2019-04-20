import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/core/services/profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  id: string
  profile
  constructor(private profileService: ProfileService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id']
    this.profileService.getProfileById(this.id)
      .subscribe(data => {
        this.profile = data
      })
  }

}
