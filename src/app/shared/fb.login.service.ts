import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from '../../../node_modules/rxjs';
@Injectable()
export class FbLoginService {
  fblogin: boolean = false;
  private fbLoginChange: BehaviorSubject<boolean> = new BehaviorSubject<
    boolean
  >(false);
  fbLoginChange$: Observable<boolean> = this.fbLoginChange.asObservable();

  constructor() {}

  setfbLoginStatus(a) {
    console.log('setfbLoginStatus called');
    this.fblogin = a;
    this.fbLoginChange.next(this.fblogin);
  }
  getfbLoginStatus(): any {
    console.log('getfbLoginStatus called');
    return this.fblogin;
  }
}
