import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../model/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
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
  };
  emailName: string;
  username: string;
  type: string = null;
  msg: string = null;
  constructor(private _route: ActivatedRoute, private _router: Router) {}

  ngOnInit() {
    firebase.auth().onAuthStateChanged(function(result) {
      // console.log(result);
      if (result) {
        var name;
        if (localStorage.getItem('fullname')) {
          name = localStorage.getItem('fullname');
          localStorage.removeItem('fullname');
        } else {
          name = result.displayName;
        }
        var email = result.email;
        var uid = result.uid;
        firebase
          .database()
          .ref('users/' + uid)
          .set({
            email: email,
            uid: uid,
            registrationDate: new Date().toString(),
            name: name
          });
      }
    });
  }
  saveUser(userform: NgForm) {
    const fullname = userform.value.fullname;
    this.emailName = userform.value.fullname;
    const email = userform.value.email;
    const password = userform.value.password;
    console.log(fullname, email, password);
    localStorage.setItem('fullname', fullname);
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userDate => {
        // console.log(userDate);
        userDate.sendEmailVerification();
        return firebase
          .database()
          .ref('users/' + userDate.uid)
          .set({
            email: email,
            uid: userDate.uid,
            registrationDate: new Date().toString(),
            name: fullname
          });
      })
      .catch(err => {
        // console.log(err);
      });
  }
  //facebook
  fblogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // console.log(result);
        result.user.sendEmailVerification();
        firebase.auth().signOut();
        // ...
      })
      .catch(function(error) {
        // console.log(error);
        localStorage.removeItem('userUID');
        this.type = 'error';
        this.msg = 'Wrong User Credentials';
      });
  }
  //  https://firebase.google.com/docs/auth/web/facebook-login#before_you_begin
  ggllogin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        console.log(result);
        result.user.sendEmailVerification();
        firebase.auth().signOut();
      })
      .catch(error => {
        localStorage.removeItem('userUID');
        this.type = 'error';
        this.msg = 'Wrong User Credentials';
      });
  }
}
