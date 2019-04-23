import { RouterModule, Route } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfilePageComponent } from '../../components/profile/profile-page/profile-page.component';
import { ProfileViewComponent } from '../../components/profile/profile-view/profile-view.component';
import { ProfilePersonalComponent } from '../../components/profile/profile-personal/profile-personal.component';
import { ProfileEditComponent } from '../../components/profile/profile-edit/profile-edit.component';

let routes: Route[] = [
    { path: 'all', pathMatch: 'full', component: ProfilePageComponent },
    { path: 'my', component: ProfilePersonalComponent },
    { path: 'edit', component: ProfileEditComponent },
    { path: ':id', component: ProfileViewComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }
