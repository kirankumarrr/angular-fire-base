import { Component, OnInit } from '@angular/core';
import { FireService } from "../shared/fire.service";
import { ActivatedRoute } from "@angular/router"
@Component({
  selector: 'app-success-full-user',
  templateUrl: './success-full-user.component.html',
  styleUrls: ['./success-full-user.component.css']
})
export class SuccessFullUserComponent implements OnInit {
  userDatafromDB: object;;
  constructor(private myFireDB: FireService, private _route: ActivatedRoute) { }

    ngOnInit() {
     debugger;
       this._route.paramMap.subscribe(params =>
        {
          const selectedUID =  params.get('id');
          this.userDatafromDB =  this.myFireDB.getUserFromDatabase(selectedUID);
          console.log(this.userDatafromDB)
        });
    }
    

}