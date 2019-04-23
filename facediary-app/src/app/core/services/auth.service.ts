import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  constructor(private toastr: MatSnackBar,
    private router: Router,
    private jwtHelper: JwtHelperService) { }

  register(email: string, password: string) {
    firebase
      .auth()
      .createUserAndRetrieveDataWithEmailAndPassword(email, password)
      .then(() => {
        this.toastr.open('Registered!', 'Success', {
          duration: 1000
        });
        this.router.navigate(['/login']);
      })
      .catch(err => {
        this.toastr.open(err.message, 'Warning!');
      });
  }
  login(email: string, password: string) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        firebase
          .auth()
          .currentUser.getIdToken()
          .then((token: string) => {
            localStorage.setItem('token', token)
            this.token = token;
          });
        localStorage.setItem('email', email)
        this.router.navigate(['/profiles/all']);
        this.toastr.open('Logged In', 'Success', {
          duration: 1000
        });
      })
      .catch(err => {
        this.toastr.open(err.message, 'Warning!', {
          duration: 1000
        });
      });
  }
  logout() {
    localStorage.clear()
    firebase
      .auth()
      .signOut()
      .then(() => {

        this.router.navigate(['/login']);
      });
    this.token = undefined;
  }
  getToken() {
    firebase.auth().currentUser.getIdTokenResult().then(data => {
      this.token = data.token
    })
    return this.token;
  }
  isAuthenticated(): boolean {
    let storageToken = localStorage.getItem('token')
    return !this.jwtHelper.isTokenExpired(storageToken);
  }
}
