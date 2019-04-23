import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';


const baseUrl = `${environment.firebase.databaseURL}/profiles/`

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(
    private http: HttpClient, private router: Router,
    private authService: AuthService
  ) { }


  getPosts(profileId) {
    return this.http.get(`${baseUrl}${profileId}/posts/.json`)

  }

  createPost(body, profileId) {
    return this.http.post(`${baseUrl}${profileId}/posts/.json`, body);
  }
  deletePost(postId, profileId) {
    return this.http.delete(`${baseUrl}${profileId}/posts/${postId}.json`);
  }
  commentPost(body, profileId, postId) {
    return this.http.post(`${baseUrl}${profileId}/posts/${postId}/comments/.json`, body);
  }
  getComentPost(profileId, postId) {
    return this.http.get(`${baseUrl}${profileId}/posts/${postId}/comments/.json`)
  }
}