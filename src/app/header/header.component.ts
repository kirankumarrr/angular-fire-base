import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import { FbLoginService } from '../service/fb.login.service';
import { Subscription } from '../../../node_modules/rxjs';
import { LoaderService } from '../loader/loader.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  LoggedIn: boolean;
  UserUid: any;
  subscription: Subscription;
  isOdd: boolean;
  constructor(
    private _router: Router,
    private _fb: FbLoginService,
    private zone: NgZone,
    private _loader: LoaderService
  ) {}

  updatelogin(a) {
    this.LoggedIn = a;
    this.LoggedIn = this._fb.getfbLoginStatus();
    // console.log('UpdateLogin', this.LoggedIn);
    this.zone.run(() => {
      firebase.auth().onAuthStateChanged(userDate => {
        if (userDate && userDate.emailVerified) {
          this.LoggedIn = true;
        } else {
          this.LoggedIn = false;
        }
      });
    });
    // console.log(this.LoggedIn);
  }
  ngOnInit() {
    this.subscription = this._fb.fbLoginChange$.subscribe(isOdd => {
      this.LoggedIn = isOdd;
      this.updatelogin(isOdd);
      this._loader.setloaderEnabledStatus(false);
    });
    firebase.auth().onAuthStateChanged(userDate => {
      if (userDate && userDate.emailVerified) {
        this.LoggedIn = true;
      } else {
        this.LoggedIn = false;
      }
    });
    // console.log(this.LoggedIn);
  }
  logoutEvent() {
    firebase.auth().signOut();
    // console.log('User Logout!!!');
    this._router.navigate(['/']);
  }
  successUser() {
    this._loader.setloaderEnabledStatus(true);
    this._router.navigate(['/success', localStorage.getItem('userUID')]);
  }
}
