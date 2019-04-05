import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import { FbLoginService } from '../service/fb.login.service';
import { Subscription } from '../../../node_modules/rxjs';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  loaderEnabled: boolean;
  subscription: Subscription;
  constructor(
    private _fb: FbLoginService,
    private zone: NgZone,
    private _loader: LoaderService
  ) {}
  updateLoader(a) {
    this.loaderEnabled = a;
    // console.log(this.loaderEnabled);
  }
  ngOnInit() {
    this.subscription = this._loader.loaderEnabledChange$.subscribe(isOdd =>
      this.updateLoader(isOdd)
    );
  }
}
