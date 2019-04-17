import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';


import { environment } from './../../../environments/environment';

@NgModule({
    imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireStorageModule,
        AngularFireAuthModule
    ],
    exports: [
        AngularFireStorageModule,
        AngularFireAuthModule
    ]
})

export class MyFireStoreModule { }

