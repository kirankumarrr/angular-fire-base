import { RouterModule, Routes } from "@angular/router"

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SingUpComponent } from './auth/sing-up/sing-up.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { SuccessFullUserComponent } from './success-full-user/success-full-user.component';
import { RouterGuardServiceService } from './auth/router-guard-service.service';
const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'success/:id',
    component: SuccessFullUserComponent,
    canActivate:[RouterGuardServiceService]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SingUpComponent,
  }
]


@NgModule({
  imports: [  RouterModule.forRoot(appRoutes)],
  exports : [
    RouterModule
  ]
})

export class AppRoutingModule { }