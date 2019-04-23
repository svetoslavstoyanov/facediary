import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';


const baseUrl = `${environment.firebase.databaseURL}/profiles/`

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  constructor(
    private http: HttpClient, private router: Router,
    private authService: AuthService
  ) { }

  postLike(body, postId, profileId) {
    return this.http.post(`${baseUrl}${profileId}/posts/${postId}/likes.json`, body);
  }
  getPostLikes(postId, profileId) {
    return this.http.get(`${baseUrl}${profileId}/posts/${postId}/likes/.json`)
  }
  deleteLike(likeId, postId, profileId) {
    return this.http.delete(`${baseUrl}${profileId}/posts/${postId}/likes/${likeId}.json`);
  }
}