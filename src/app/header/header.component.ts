import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewChecked,
  NgZone
} from '@angular/core';
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
export class HeaderComponent implements OnInit, AfterViewChecked {
  LoggedIn: boolean;
  UserUid: any;
  subscription: Subscription;
  isOdd: boolean;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _fb: FbLoginService,
    private cd: ChangeDetectorRef,
    private zone: NgZone,
    private _loader: LoaderService
  ) {}
  public ngAfterViewChecked(): void {
    /* need _canScrollDown because it triggers even if you enter text in the textarea */
  }
  updatelogin(a) {
    this.LoggedIn = a;
    this.LoggedIn = this._fb.getfbLoginStatus();
    console.log('UpdateLogin', this.LoggedIn);
    //ask firebase wheather user is loggedin or not
    this.zone.run(() => {
      /* my code here */
      firebase.auth().onAuthStateChanged(userDate => {
        if (userDate && userDate.emailVerified) {
          this.LoggedIn = true;
        } else {
          this.LoggedIn = false;
        }
      });
    });
    console.log(this.LoggedIn);
  }
  ngOnInit() {
    this.subscription = this._fb.fbLoginChange$.subscribe(isOdd => {
      this.LoggedIn = isOdd;
      this.updatelogin(isOdd);
      this._loader.setloaderEnabledStatus(false);
    });

    //ask firebase wheather user is loggedin or not
    firebase.auth().onAuthStateChanged(userDate => {
      if (userDate && userDate.emailVerified) {
        this.LoggedIn = true;
      } else {
        this.LoggedIn = false;
        //  firebase.auth().signOut();
      }
    });
    console.log(this.LoggedIn);
  }
  logoutEvent() {
    firebase.auth().signOut();
    console.log('User Logout!!!');
    this._router.navigate(['/']);
  }
  successbtn() {
    this._router.navigate(['/success', this.UserUid]);
  }
}
