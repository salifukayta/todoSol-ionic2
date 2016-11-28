import { Component } from '@angular/core';
import { User, UserDetails, Auth, IDetailedError, FacebookAuth } from '@ionic/cloud-angular';
import { NavController, MenuController } from 'ionic-angular';
import { TodoPage } from '../todo/todo';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  userDetails: UserDetails;
  isLogin = true;

  constructor(private auth: Auth, private facebookAuth: FacebookAuth, private user: User,
              private nav: NavController, private menu: MenuController) {
    this.userDetails = new Object();
    this.menu.enable(false);
  }

  login() {
    if (!this.isLogin) {
      this.isLogin = true;
    } else {
      this.auth.login('basic', this.userDetails, {'remember': false}).then(() => {
        this.menu.enable(true);
        this.nav.setRoot(TodoPage);
      }, (err) => {
        alert('error login');
        console.log(err);
      });
    }
  }

  //TODO to be continued => do not work ? somthing is missing
  loginFacebook() {
    this.facebookAuth.login().then(() => {
      alert('success login facebook');
      this.menu.enable(true);
      this.nav.setRoot(TodoPage);
    }, (err) => {
      alert('error login facebook');
      console.log(err);
    });
  }

  signUp() {
    if (this.isLogin) {
      this.isLogin = false;
    } else {
      this.auth.signup(this.userDetails).then(() => {
        // `this.user` is now registered
        this.isLogin = true;
        this.login();
      }, (err: IDetailedError<string[]>) => {
        for (let e of err.details) {
          if (e === 'conflict_email') {
            alert('Email already exists.');
          } else {
            // handle other errors
            alert(err);
          }
        }
      });
    }
  }

  resetPasswork() {
    this.userDetails.password = this.auth.passwordResetUrl;
    //TODO to be continued => do a get request ?
  }

}
