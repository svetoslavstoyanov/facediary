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

  postLike(body, profileId) {
    return this.http.post(`${baseUrl}${profileId}/likes/.json`, body);
  }
  deleteLike(likeId, profileId) {
    return this.http.delete(`${baseUrl}${profileId}/likes/${likeId}.json`);
  }
}