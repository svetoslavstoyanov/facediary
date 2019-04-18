import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profiles: Observable<any[]>
  constructor(
    private db: AngularFirestore) {
  }

  ngOnInit() {
    this.profiles = this.db.collection('profiles').valueChanges()

  }

}
