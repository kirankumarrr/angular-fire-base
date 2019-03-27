import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import { Router } from "@angular/router";
import {StorageService } from "./storage.service";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  LoggedIn: boolean = false;
  constructor(private _router: Router, private localservice: StorageService) { }

  ngOnInit() {
  this.localservice.watchStorage().subscribe((data:string) => {
      // this will call whenever your localStorage data changes
      // use localStorage code here and set your data here for ngFor
      })
    //ask firebase wheather user is loggedin or not
    firebase.auth().onAuthStateChanged(userDate => {
      if (userDate && userDate.emailVerified) {
        this.LoggedIn = true;
      }
      else {
        this.LoggedIn = false;
        //  firebase.auth().signOut();
      }
    })
   if (firebase.auth().currentUser) {
      this.LoggedIn = true;
    }
    else {
      this.LoggedIn = false;
    }
  }
  logoutEvent() {
    firebase.auth().signOut();
    console.log("User Logout!!!");
    this._router.navigate(["/"]);
  }

}