import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/core/services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LikeService } from 'src/app/core/services/like.service';
import { PostsService } from 'src/app/core/services/posts.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  id: string
  likeProfile: FormGroup
  dislikeProfile: FormGroup
  commentProfile: FormGroup
  profile: any
  likes = 0
  likeValue = ''
  posts = []
  isPosts: boolean = false
  comments
  constructor(private profileService: ProfileService,
    private likeService: LikeService,
    private route: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder,
    private postsService: PostsService) { }

  ngOnInit() {

    this.likeProfile = this._formBuilder.group({
      email: [localStorage.getItem('name'), Validators.required],
    })

    this.dislikeProfile = this._formBuilder.group({
      email: ['', Validators.required],
    })
    this.profileService.getPersonalProfile()
      .subscribe(data => {
        this.commentProfile = this._formBuilder.group({
          id: [data[0].id, Validators.required],
          name: [data[0].name, Validators.required],
          profilePhoto: [data[0].profilePhoto, Validators.required],
          comment: ['', Validators.required]
        })
      })

    this.id = this.route.snapshot.params['id']
    this.profileService.getProfileById(this.id)
      .subscribe(data => {
        this.profile = data
      })

    this.postsService.getPosts(this.id)
      .subscribe(data => {
        if (data) {
          for (const [key, value] of Object.entries(data)) {
            this.likes = 0
            let isLiked = false
            if (value['comments']) {
              this.comments = Object.entries(value['comments'])
            }
            if (value['likes']) {
              let obj = value['likes']
              let ol = Object.keys(obj)
              this.likes = ol.length
              for (let value of Object.values(obj)) {
                if (value['email'] == localStorage.getItem('email')) {
                  isLiked = true
                } else {
                  isLiked = false
                }
              }
            }
            this.posts.push({ id: key, post: value['post'], likes: this.likes, isLiked, comments: this.comments })
            this.comments = ''
          }
          this.isPosts = true
        } else {
          this.posts.push({ id: '0', post: 'No posts' })
        }
      }

      )
  }
  likeProfilef(postId) {
    let email = localStorage.getItem('email')
    let body = {
      email
    }
    this.likeService.postLike(body, postId, this.id)
      .subscribe(() => {
        this.router.navigate([`/profiles/`]);
      })
  }

  dislikeProfilef(postId) {
    this.likeService.getPostLikes(postId, this.id).subscribe(data => {
      Object.entries(data).forEach(e => {
        if (e[1]['email'] == localStorage.getItem('email')) {
          let likeId = e[0]
          this.likeService.deleteLike(likeId, postId, this.id).subscribe(
            data => {
              this.router.navigate([`/profiles/`]);
            })
        }
      })
    })
  }
  postComment(postId) {
    let result = this.commentProfile.value
    this.postsService.commentPost(result, this.id, postId)
      .subscribe(() => {
        this.router.navigate([`/profiles/`]);
      })
  }
}
