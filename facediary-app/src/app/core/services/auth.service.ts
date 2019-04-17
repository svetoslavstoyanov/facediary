import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuth = false;

  isAuthChanged = new Subject<boolean>();
  token: string;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  get isAuth() {
    return this._isAuth;
  }

  registerUser(email: string, password: string) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        this.snackbar.open(error.message, 'Undo', {
          duration: 3000
        });
      });
  }
  loginUser(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((userData) => {
        firebase
          .auth()
          .currentUser.getIdToken()
          .then((token: string) => {
            this.token = token;
          }); this.router.navigate(['/']);
        localStorage.setItem('email', userData.user.email);
        localStorage.setItem('authToken', this.token);
      })
      .catch((error) => {
        this.snackbar.open(error.message, 'Undo', {
          duration: 3000
        });
      });
  }

  logout() {
    this.afAuth.auth.signOut();
    localStorage.clear();
    this.token = null
    this.router.navigate(['/']);
  }
  isAuthenticated(): boolean {
    return this.token != null;
  }
}
