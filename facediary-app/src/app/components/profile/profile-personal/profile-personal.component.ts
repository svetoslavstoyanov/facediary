import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/core/services/profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from 'src/app/core/services/posts.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

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
  deleteCommentFormGroup: FormGroup
  comments
  constructor(private profileService: ProfileService,
    private _formBuilder: FormBuilder,
    private postService: PostsService,
    private router: Router,
    private toastr: MatSnackBar
  ) { }

  ngOnInit() {
    this.postFormGroup = this._formBuilder.group({
      post: ['', Validators.required]
    })
    this.deletePostFormGroup = this._formBuilder.group({
      postId: ['', Validators.required]
    })

    this.profileService.getPersonalProfile().subscribe(data => {
      this.profile = data[0]
      this.postService.getPosts(this.profile.id).subscribe(
        data => {
          for (const [key, value] of Object.entries(data)) {
            if (value['comments']) {
              this.comments = Object.entries(value['comments'])
            }
            this.posts.push({ id: key, post: value['post'], comments: this.comments })
            this.comments = ''
          }
        }
      )
    })

  }
  post() {
    let post = this.postFormGroup.value['post']
    let body = {
      post
    }
    this.postService.createPost(body, this.profile.id).subscribe(
      () => {
        this.toastr.open('Successfull post!', '', {
          duration: 1000
        })
        this.router.navigate(['/profiles/all'])
      }
    )
  }
  deletePost(postId) {
    this.postService.deletePost(postId, this.profile.id).subscribe(() => {
      this.toastr.open('Successfull delete!', '', {
        duration: 1000
      })
      this.router.navigate['/profiles/all']
    })
  }

}
