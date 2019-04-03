import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from '../../../node_modules/rxjs';
@Injectable()
export class LoaderService {
  loaderEnabled: boolean;
  private loaderEnabledChange: BehaviorSubject<boolean> = new BehaviorSubject<
    boolean
  >(false);
  loaderEnabledChange$: Observable<
    boolean
  > = this.loaderEnabledChange.asObservable();

  constructor() {}

  setloaderEnabledStatus(a) {
    console.log('setloaderEnabledStatus called');
    this.loaderEnabled = a;
    this.loaderEnabledChange.next(this.loaderEnabled);
  }
  getloaderEnabledStatus(): any {
    console.log('getloaderEnabledStatus called');
    return this.loaderEnabled;
  }
}
