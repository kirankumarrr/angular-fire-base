import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from '../../../node_modules/rxjs';
@Injectable()
export class LoaderService {
  loaderEnabled: any;
  private loaderEnabledChange: BehaviorSubject<any> = new BehaviorSubject<any>(
    false
  );
  loaderEnabledChange$: Observable<
    any
  > = this.loaderEnabledChange.asObservable();
  constructor() {}

  setloaderEnabledStatus(a) {
    // console.log('setloaderEnabledStatus called');
    this.loaderEnabled = a;
    this.loaderEnabledChange.next(this.loaderEnabled);
  }
  getloaderEnabledStatus(): any {
    // console.log('getloaderEnabledStatus called');
    return this.loaderEnabled;
  }
}
