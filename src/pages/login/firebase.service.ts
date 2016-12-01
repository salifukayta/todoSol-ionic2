import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as firebase from "firebase";

import { UserModel } from './UserModel';

@Injectable()
export class FirebaseService {

  constructor(private http: Http) {

  }

  emailLogin(userModel: UserModel) {
    return firebase.auth().signInWithEmailAndPassword(userModel.email, userModel.password);
  }

  facebookLogin() {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    return firebase.auth().getRedirectResult();
    //.then(function(result) {
    //  if (result.credential) {
    //    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    //    var token = result.credential.accessToken;
    //  }
    //  // The signed-in user info.
    //  var user = result.user;
    //}).catch(function(error) {
    //  var errorCode = error.code;
    //  var errorMessage = error.message;
    //  // The email of the user's account used.
    //  var email = error.email;
    //  // The firebase.auth.AuthCredential type that was used.
    //  var credential = error.credential;
    //});
  }

  signup(userModel: UserModel) {
    return firebase.auth().createUserWithEmailAndPassword(userModel.email, userModel.password);
  }

  resetPassword(userModel: UserModel) {
    alert('do not exist here !');
    return this.http.get('', userModel);
  }
}
