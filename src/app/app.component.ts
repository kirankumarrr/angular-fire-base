import { Component , OnInit} from '@angular/core';
import * as firebase from "firebase";
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name = 'Angular';

  ngOnInit() {
    // Firebase Integration Code
    const config = {
      apiKey: "AIzaSyCMmMw8637fbArFgeSaoRzGo28dbv89nhA",
      authDomain: "angularfirebase-pro.firebaseapp.com",
      databaseURL: "https://angularfirebase-pro.firebaseio.com",
      projectId: "angularfirebase-pro",
      storageBucket: "angularfirebase-pro.appspot.com",
      messagingSenderId: "196973031332"
    };
    firebase.initializeApp(config);
  }
}
