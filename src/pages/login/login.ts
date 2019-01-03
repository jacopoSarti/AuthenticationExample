import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    public navCtrl: NavController,
    public authProvider: AuthProvider,
    public formBuilder: FormBuilder 
  ) {}

  ionViewWillLoad() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  tryLogin(value) {
    this.authProvider.doLogin(value)
    .then(res => {
      console.log(res);
      this.navCtrl.push('UserPage');
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
    });
  }

  tryFacebookLogin(){
    this.authProvider.doFacebookLogin()
    .then((res) => {
      this.navCtrl.push('UserPage');
    }, (err) => {
      this.errorMessage = err.message;
    });
  }

  goRegisterPage() {
    this.navCtrl.push('RegisterPage');
  }
}
