import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'facediary-app';
  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: environment.firebase.apiKey,
      authDomain: environment.firebase.authDomain
    });
  }
}
