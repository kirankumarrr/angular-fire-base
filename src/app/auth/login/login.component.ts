import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { FbLoginService } from '../../service/fb.login.service';
import { LoaderService } from '../../loader/loader.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  type: string = null;
  msg: string = null;
  constructor(
    private _router: Router,
    private _fb: FbLoginService,
    private _loader: LoaderService
  ) {}

  ngOnInit() {}
  LoginUser(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(userData => {
        if (userData.emailVerified) {
          localStorage.setItem('userUID', userData.uid);
          this._router.navigate(['/success', userData.uid]);
        } else {
          localStorage.removeItem('userUID');
          this.type = 'error';
          this.msg = 'Email Verification Pending!!!';
        }
      })
      .catch(userData => {
        localStorage.removeItem('userUID');
        this.type = 'error';
        this.msg = 'Wrong User Credentials';
      });
  }
  fblogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        if (result.user.emailVerified) {
          localStorage.setItem('userUID', result.user.uid);
          this._router.navigate(['/success', result.user.uid]);
          this._fb.setfbLoginStatus(result.user.emailVerified);
          this._router.navigate(['/success', result.user.uid]);
        } else {
          this.type = 'error';
          this.msg = 'Email Verification Pending!!!';
        }
      })
      .catch(error => {
        console.log(error);
        localStorage.removeItem('userUID');
        this.type = 'error';
        this.msg = 'Wrong User Credentials';
      });
  }

  ggllogin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        if (result.user.emailVerified) {
          console.log('next');
          localStorage.setItem('userUID', result.user.uid);
          this._router.navigate(['/success', result.user.uid]);
          this._fb.setfbLoginStatus(result.user.emailVerified);
        } else {
          this.type = 'error';
          this.msg = 'Email Verification Pending';
        }
      })
      .catch(error => {
        console.log(error);
        localStorage.removeItem('userUID');
        this.type = 'error';
        this.msg = 'Wrong User Credentials';
      });
  }
}
