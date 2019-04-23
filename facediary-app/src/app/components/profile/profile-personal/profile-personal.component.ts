import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/core/services/profile.service';
import { AuthService } from './../../../core/services/auth.service';
import { auth } from 'firebase';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from 'src/app/core/services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-personal',
  templateUrl: './profile-personal.component.html',
  styleUrls: ['./profile-personal.component.css']
})
export class ProfilePersonalComponent implements OnInit {
  profile
  posts = []
  postFormGroup: FormGroup
  deletePostFormGroup: FormGroup
  constructor(private profileService: ProfileService,
    private _formBuilder: FormBuilder,
    private postService: PostsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.profileService.getPersonalProfile().subscribe(data => {
      this.profile = data[0]
      this.postService.getPosts(this.profile.id).subscribe(
        data => {
          for (const [key, value] of Object.entries(data)) {
            this.posts.push({ id: key, post: value['post'] })
          }
        }
      )
    })
    this.postFormGroup = this._formBuilder.group({
      post: ['', Validators.required]
    })
    this.deletePostFormGroup = this._formBuilder.group({
      postId: ['', Validators.required]
    })
  }
  post() {
    let post = this.postFormGroup.value['post']
    let body = {
      post
    }
    this.postService.createPost(body, this.profile.id).subscribe(
      () => {
        console.log(body)
        this.router.navigate(['/profiles'])
      }
    )
  }
  deletePost(postId) {
    this.postService.deletePost(postId, this.profile.id).subscribe(data => {
    })
  }

}
