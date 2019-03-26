import { Injectable } from '@angular/core';
import { CanActivate } from "@angular/router";

import * as firebase from "firebase";

@Injectable()
export class RouterGuardServiceService implements CanActivate {
  canActivate() {
    //if user logged in then return true
    //firebase is a single based on truth
    if (firebase.auth().currentUser) {
      return true;
    }
    else {
      return false;
    }
  }
  constructor() { }

}