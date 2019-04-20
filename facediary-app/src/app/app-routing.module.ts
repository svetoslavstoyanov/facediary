import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProfileEditComponent } from './components/profile/profile-edit/profile-edit.component';
import { ProfilePersonalComponent } from './components/profile/profile-personal/profile-personal.component';
import { ProfilePageComponent } from './components/profile/profile-page/profile-page.component';
import { ProfileViewComponent } from './components/profile/profile-view/profile-view.component';


const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profiles', component: ProfilePageComponent },
    { path: 'profile/edit', component: ProfileEditComponent },
    { path: 'Ownprofile', component: ProfilePersonalComponent },
    { path: 'profiles/:id', component: ProfileViewComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
