import { Component, OnInit, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { FbLoginService } from '../../service/fb.login.service';
import { LoaderService } from '../../loader/loader.service';
import { FireService } from '../../shared/fire.service';
import { UserdetailService } from '../../service/userdetatils.service';
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
    private _loader: LoaderService,
    private _myfire: FireService,
    public _userdetail: UserdetailService
  ) {}

  ngOnInit() {}
  LoginUser(form: NgForm) {
    this._loader.setloaderEnabledStatus(true);
    const email = form.value.email;
    const password = form.value.password;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(userData => {
        if (userData.emailVerified) {
          localStorage.setItem('userUID', userData.uid);
          this._router.navigate(['/success', userData.uid]);

          return this._myfire.getUserFromDatabase(userData.uid);
        } else {
          localStorage.removeItem('userUID');
          this.type = 'error';
          this.msg = 'Email Verification Pending!!!';
        }
      })
      .then(userInfo => {
        if (userInfo) {
          // console.log(userInfo);
          this._userdetail.setUserDetails(userInfo);
        }
      })
      .catch(error => {
        localStorage.removeItem('userUID');
        this.type = 'error';
        this.msg = 'Wrong User Credentials';
      });
  }
  commonSocialMediaFun(provider) {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        if (result.user.emailVerified) {
          localStorage.setItem('userUID', result.user.uid);
          this._fb.setfbLoginStatus(result.user.emailVerified);
          this._router.navigate(['/success', result.user.uid]);
          return this._myfire.getUserFromDatabase(result.user.uid);
        } else {
          this.type = 'error';
          this.msg = 'Email Verification Pending!!!';
        }
      })
      .then(userInfo => {
        if (userInfo) {
          // console.log(userInfo);
          this._userdetail.setUserDetails(userInfo);
        }
      })
      .catch(error => {
        // console.log(error);
        localStorage.removeItem('userUID');
        this.type = 'error';
        this.msg = 'Wrong User Credentials';
      });
  }
  //facebook login
  fblogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    this.commonSocialMediaFun(provider);
  }
  //google login
  ggllogin() {
    var provider = new firebase.auth.GoogleAuthProvider();
    this.commonSocialMediaFun(provider);
  }
}
