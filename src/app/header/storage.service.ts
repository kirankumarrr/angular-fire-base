import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
@Injectable()
export class StorageService {
  private storageSub= new Subject<boolean>();
  constructor() { }
  watchStorage(): Observable<any> {
      return this.storageSub.asObservable();
    }

    setItem(key: string, userUID: any) {
      localStorage.setItem(key, userUID);
      this.storageSub.next('changed');
    }

    removeItem(key) {
      localStorage.removeItem(key);
      this.storageSub.next('changed');
    }
}

//install rxjs-compat@6.4.0 and rxjs