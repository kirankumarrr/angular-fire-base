import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms"
import { User } from "../../model/user.model";

import * as firebase from "firebase";

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.css']
})
export class SingUpComponent implements OnInit {
  user: User = {
    fullname: null,
    email: null,
    password: null
  }
  constructor() { }

  ngOnInit() {
  }
  saveUser(userform: NgForm) {
    console.log(userform);
    console.log(this.user);
    const fullname = this.user.fullname;
    const email = this.user.email
    const password = this.user.password;
    console.log(fullname, email, password);
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(userDate => {
        console.log(userDate);
      })
      .catch(err => {
        console.log(err);
      })
  }
}