import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  profile
  constructor(private authService: AuthService,
    private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getPersonalProfile()
      .subscribe(data => {
        this.profile = data[0]
      })
  }
  logout() {
    this.authService.logout();
  }
}
