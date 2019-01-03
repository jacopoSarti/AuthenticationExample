import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    public navCtrl: NavController,
    public authService: AuthProvider,
    public formBuilder: FormBuilder
  ) {}

  ionViewWillLoad() {
    this.registerForm = this.formBuilder.group({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  tryRegister(value) {
    this.authService.doRegister(value)
    .then(res => {
      this.errorMessage = "";
      this.successMessage = "Your account has been created. Please log in now."
    }, err => {
      this.errorMessage = err.message;
      this.successMessage = "";
    })
  }

  goLoginPage() {
    this.navCtrl.popToRoot();
  }

}
