import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private firestore: AngularFirestore) {

  }
  getProfiles() {
    return this.firestore.collection('profiles').snapshotChanges();
  }

}
