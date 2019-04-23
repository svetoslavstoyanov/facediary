import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { Profiles } from './../models/profile.model';
import { personalProfile } from '../models/personalProfile.model';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';


const baseUrl = `${environment.firebase.databaseURL}/profiles/`

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    constructor(
        private http: HttpClient, private router: Router,
        private authService: AuthService
    ) { }

    getAllProfiles() {
        return this.http.get(`${baseUrl}.json`)
            .pipe(map((res: Response) => {
                const ids = Object.keys(res);
                const profiles: Profiles[] = [];
                for (const i of ids) {
                    profiles.push(new Profiles(i,
                        res[i].name, res[i].surname,
                        res[i].profilePhoto, res[i].coverPhoto,
                        res[i].emailProfile, res[i].location,
                        res[i].birthday, res[i].bio, res[i].posts
                    ));
                }
                return profiles;
            }));
    }
    getPersonalProfile() {
        return this.http.get(`${baseUrl}.json`)
            .pipe(map((res: Response) => {
                const ids = Object.keys(res);
                const profiles: Profiles[] = [];
                for (const i of ids) {
                    profiles.push(new Profiles(i,
                        res[i].name, res[i].surname,
                        res[i].profilePhoto, res[i].coverPhoto,
                        res[i].emailProfile, res[i].location,
                        res[i].birthday, res[i].bio, res[i].posts
                    ));
                }
                let arr = []
                let personalProfile = profiles
                    .find(profile => profile.emailProfile === `${localStorage.getItem('email')}`)
                localStorage.setItem('name', personalProfile['name'] + '')
                arr.push(personalProfile)
                return arr;
            }));
    }
    createProfile(body: personalProfile) {
        return this.http.post(`${baseUrl}.json`, body);
    }
    editProfile(body) {
        let token = this.authService.getToken()
        return this.http.patch(`${baseUrl}.json?auth=${token}`, body)
    }
    getProfileById(profileId) {
        let token = this.authService.getToken()
        return this.http.get<Profiles>(`${baseUrl}${profileId}/.json?auth=${token}`);
    }
}