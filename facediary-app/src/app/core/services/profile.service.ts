import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { Profiles } from './../models/profile.model';
import { personalProfile } from '../models/personalProfile.model';


const baseUrl = `${environment.firebase.databaseURL}/profiles/`

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    constructor(
        private http: HttpClient
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
                        res[i].birthday, res[i].bio
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
                        res[i].birthday, res[i].bio
                    ));
                } 
                let arr = []
                let personalProfile = profiles
                    .find(profile => profile.emailProfile === `${localStorage.getItem('email')}`)
                    arr.push(personalProfile)
                return arr;
            }));
    }

    createProfile(body: personalProfile) {
        return this.http.post(`${baseUrl}.json`, body);
    }
}