import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';

const baseUrl = `${environment.firebase.databaseURL}/profiles/`

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(
    private http: HttpClient
  ) { }

  deleteProfile(profileId) {
    return this.http.delete(`${baseUrl}${profileId}/.json`)
  }
  deletePost(profileId, postId) {
    return this.http.delete(`${baseUrl}${profileId}/posts/${postId}.json`);

  }
  deleteComment(profileId, postId, commentId) {
    return this.http.delete(`${baseUrl}${profileId}/posts/${postId}/comments/${commentId}.json`)

  }
}