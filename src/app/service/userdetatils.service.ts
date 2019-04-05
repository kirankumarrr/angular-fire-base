import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from '../../../node_modules/rxjs';
import { UserRead } from '../model/user.read.model';
@Injectable()
export class UserdetailService {
  UserDetails: UserRead;
  private UserDetailsChanged: BehaviorSubject<UserRead> = new BehaviorSubject<
    UserRead
  >(null);
  UserDetailsChanged$: Observable<
    UserRead
  > = this.UserDetailsChanged.asObservable();

  constructor() {}

  setUserDetails(user) {
    // if (user) {
    //   if (user.name) {
    //     this.UserDetails.fullname = user.name;
    //   } else {
    //     this.UserDetails.fullname = 'user.name missing';
    //   }
    //   if (user.email) {
    //     this.UserDetails.email = user.email;
    //   } else {
    //     this.UserDetails.email = 'user.email missing';
    //   }
    //   if (user.uid) {
    //     this.UserDetails.uid = user.uid;
    //   } else {
    //     this.UserDetails.uid = 'User Id missing';
    //   }
    // }
    this.UserDetails = Object.assign({}, user);
    this.UserDetailsChanged.next(this.UserDetails);
  }
  getUserDetails(): any {
    return this.UserDetailsChanged;
  }
}
