import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import * as firebase from "firebase";

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { TodoPage } from '../pages/todo/todo';
import { LoginPage } from '../pages/login/login';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Todo Sol', component: TodoPage },
      { title: 'Page One', component: Page1 },
      { title: 'Page Two', component: Page2 }
    ];

  }

  initializeApp() {
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyBDTVzNTocX7b2V1iq9oBKTcKX2VykOOTs",
      authDomain: "soltodo-2966a.firebaseapp.com",
      databaseURL: "https://soltodo-2966a.firebaseio.com",
      storageBucket: "soltodo-2966a.appspot.com",
      messagingSenderId: "670219445506"
    };
    firebase.initializeApp(config);

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
