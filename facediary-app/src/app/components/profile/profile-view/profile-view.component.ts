import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/core/services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isObject } from 'util';
import { LikeService } from 'src/app/core/services/like.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  id: string
  likeProfile: FormGroup
  commentProfile: FormGroup
  profile: any
  isLiked: boolean = false
  likes = 0
  constructor(private profileService: ProfileService,
    private likeService: LikeService,
    private route: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.likeProfile = this._formBuilder.group({
      email: [localStorage.getItem('name'), Validators.required],
    })
    this.commentProfile = this._formBuilder.group({
      comment: ['', Validators.required],

    })

    this.id = this.route.snapshot.params['id']
    this.profileService.getProfileById(this.id)
      .subscribe(data => {
        if (data['likes']) {
          let obj = data['likes']
          var ol = Object.keys(obj)
          this.likes = ol.length
          for (let value of Object.values(obj)) {
            if (value['email'] == localStorage.getItem('email')) {
              this.isLiked = true
            }
          }
        }
        this.profile = data
      })
  }
  likeProfilef() {
    let email = localStorage.getItem('email')
    let body = {
      email
    }
    if (!this.isLiked) {
      this.likeService.postLike(body, this.id)
        .subscribe(() => {
          this.router.navigate([`/profiles/`]);
        })
    }
    else {
      this.likeService.deleteLike('', this.id)
        .subscribe(() => {
          this.router.navigate([`/profiles/`]);
        })
    }
  }

  postComment() {
    console.log(this.commentProfile.value)
  }
}
