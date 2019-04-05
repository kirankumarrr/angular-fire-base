import { Component, OnInit, NgZone } from '@angular/core';
import { FireService } from '../shared/fire.service';
import { ActivatedRoute } from '@angular/router';
import { UserdetailService } from '../service/userdetatils.service';
import { UserRead } from '../model/user.read.model';
import { Subscription } from '../../../node_modules/rxjs';
import { LoaderService } from '../loader/loader.service';
@Component({
  selector: 'app-success-full-user',
  templateUrl: './success-full-user.component.html',
  styleUrls: ['./success-full-user.component.css']
})
export class SuccessFullUserComponent implements OnInit {
  subscription: Subscription;
  userDatafromDB: UserRead;
  constructor(
    private _userinfo: UserdetailService,
    private _loader: LoaderService,
    protected _myfire: FireService,
    public _userdetail: UserdetailService
  ) {}
  handleData(data) {
    this.userDatafromDB = data;
    if (data !== null) {
      this._loader.setloaderEnabledStatus(false);
    }
  }
  ngOnInit() {
    if (
      localStorage.getItem('userUID') !== undefined &&
      localStorage.getItem('userUID') !== null &&
      localStorage.getItem('userUID') !== ''
    ) {
      this._myfire
        .getUserFromDatabase(localStorage.getItem('userUID'))
        .then(userInfo => {
          if (userInfo) {
            // console.log(userInfo, 'Successpage');
            this._userdetail.setUserDetails(userInfo);
            this._loader.setloaderEnabledStatus(false);
          }
        });
    }

    //When login show this getUserFromDatabase
    this.subscription = this._userinfo.UserDetailsChanged$.subscribe(
      (data: UserRead) => this.handleData(data)
    );
  }
}
