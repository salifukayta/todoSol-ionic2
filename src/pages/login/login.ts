import { Component } from '@angular/core';
import { IDetailedError } from '@ionic/cloud-angular';
import { NavController, MenuController } from 'ionic-angular';
import { TodoPage } from '../todo/todo';
import { CloudIonicService } from './cloud-ionic.service';
import { UserModel } from './UserModel';
import { FirebaseService } from './firebase.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  userModel: UserModel;
  isLogin = true;

  //CloudIonicService
  constructor(private loginService: FirebaseService, private nav: NavController, private menu: MenuController) {
    this.userModel = new UserModel();
    this.menu.enable(false);
  }

  login() {
    if (!this.isLogin) {
      this.isLogin = true;
    } else {
      this.loginService.emailLogin(this.userModel).then((data) => {
        this.menu.enable(true);
        this.nav.setRoot(TodoPage);
      }, (err) => {
        alert('error login');
        console.log(err);
      });
    }
  }

  //TODO to be testes
  loginFacebook() {
    this.loginService.facebookLogin().then((data) => {
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
      this.loginService.signup(this.userModel).then(() => {
        // `this.user` is now registered
        this.isLogin = true;
        this.login();
      }, (err: any) => {
        // err: IDetailedError<string[]>
        console.error(err);
        if (err.code === 'auth/email-already-in-use') {
          alert('Email already exists.');
        }
        //for (let e of err.details) {
        //  if (e === 'conflict_email') {
        //    alert('Email already exists.');
        //  } else {
        //    // handle other errors
        //    alert(err);
        //  }
        //}
      });
    }
  }

  resetPasswork() {
    //TODO to be continued => do a get request ?
    this.loginService.resetPassword(this.userModel).subscribe(() => {
      console.log('reset success');
    }, (err) => {
      console.log('reset error');
    });
  }

}
