import { Injectable } from '@angular/core';
import { Auth, FacebookAuth, User } from '@ionic/cloud-angular';
import { Http } from '@angular/http';
import { UserModel } from './UserModel';

@Injectable()
export class CloudIonicService {

  constructor(private http: Http, private auth: Auth, private facebookAuth: FacebookAuth,
              private user: User) {

  }


  emailLogin(userModel: UserModel) {
    return this.auth.login('basic', userModel, {'remember': false});
  }

  facebookLogin() {
    return this.facebookAuth.login();
  }

  signup(userModel: UserModel) {
    return this.auth.signup(userModel);
  }

  resetPassword(userModel: UserModel) {
    //TODO not tested yet
    //this.userModel.password = this.auth.passwordResetUrl;
    return this.http.get(this.auth.passwordResetUrl, userModel);
  }
}
