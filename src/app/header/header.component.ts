import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
LoggedIn :boolean = false;
  constructor() { }

  ngOnInit() {

    //ask firebase wheather user is loggedin or not
    firebase.auth().onAuthStateChanged( userDate => {
      if(userDate && userDate.emailVerified){
        this.LoggedIn = true;
      }
      else{
         this.LoggedIn = false;
        //  firebase.auth().signOut();
      }
    })

  }

}