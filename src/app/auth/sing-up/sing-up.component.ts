import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms"
import { User } from "../../model/user.model";
import { ActivatedRoute, Router } from '@angular/router';
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
  type: string = null;
  msg: string = null;
  constructor(private _route: ActivatedRoute,
    private _router: Router) { }

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
        userDate.sendEmailVerification();
          return firebase.database().ref('users/' + userDate.uid).set({
              email: email,
              uid: userDate.uid,
              registrationDate: new Date().toString(),
              name: fullname
            })
        // console.log(userDate);
      })
      .catch(err => {
        console.log(err);
      })
  }
}