import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './core/modules/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { HomeComponent } from './components/home/home.component';


import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MyFireStoreModule } from './core/modules/firebase.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProfilePageComponent } from './components/profile/profile-page/profile-page.component';
import { ProfileEditComponent } from './components/profile/profile-edit/profile-edit.component';
import { ProfilePersonalComponent } from './components/profile/profile-personal/profile-personal.component';
import { ProfileViewComponent } from './components/profile/profile-view/profile-view.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProfilePageComponent,
    ProfileEditComponent,
    ProfilePersonalComponent,
    ProfileViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    MyFireStoreModule,
    HttpClientModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
