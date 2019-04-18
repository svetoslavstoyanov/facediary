import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  constructor(private toastr: MatSnackBar, private router: Router) { }

  register(email: string, password: string) {
    firebase
      .auth()
      .createUserAndRetrieveDataWithEmailAndPassword(email, password)
      .then(data => {
        this.toastr.open('Signed Up!', 'Success', {
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
      .then(data => {
        firebase
          .auth()
          .currentUser.getIdToken()
          .then((token: string) => {
            this.token = token;
          });
        localStorage.setItem('email', email)
        this.router.navigate(['/Ownprofile']);
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
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.router.navigate(['/login']);
      });
    this.token = null;
  }
  getToken() {
    firebase
      .auth()
      .currentUser.getIdToken()
      .then((token: string) => {
        this.token = token;
      });
    return this.token;
  }
  isAuthenticated(): boolean {
    return this.token != null;
  }
}
