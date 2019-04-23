import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfilePageComponent } from '../../components/profile/profile-page/profile-page.component';
import { ProfileViewComponent } from '../../components/profile/profile-view/profile-view.component';
import { ProfilePersonalComponent } from '../../components/profile/profile-personal/profile-personal.component';
import { ProfileEditComponent } from '../../components/profile/profile-edit/profile-edit.component';
import { ProfileRoutingModule } from '../routing/profile-routing.module';
import { MaterialModule } from 'src/app/core/modules/material.module';
import { FlexModule } from '@angular/flex-layout';


@NgModule({
    declarations: [
        ProfilePageComponent,
        ProfileViewComponent,
        ProfilePersonalComponent,
        ProfileEditComponent
    ],
    imports: [CommonModule,
        FormsModule,
        ProfileRoutingModule,
        MaterialModule,
        FlexModule,
        ReactiveFormsModule]
})
export class ProfileModule { }
