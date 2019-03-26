import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SingUpComponent } from './auth/sing-up/sing-up.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from "./app-routing-module";
import { SuccessFullUserComponent } from './success-full-user/success-full-user.component';
import { RouterGuardServiceService } from './auth/router-guard-service.service';
import { NotificationComponent } from './notification/notification.component';
import {FireService } from "./shared/fire.service";
@NgModule({
  imports: [BrowserModule, FormsModule, AppRoutingModule],
  declarations: [AppComponent, HeaderComponent, SingUpComponent, LoginComponent, HomeComponent, SuccessFullUserComponent, NotificationComponent],
  providers: [RouterGuardServiceService,FireService],
  bootstrap: [AppComponent]
})
export class AppModule { }
