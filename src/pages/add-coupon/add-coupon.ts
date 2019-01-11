import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import firebase from 'firebase';

/**
 * Generated class for the AddCouponPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-coupon',
  templateUrl: 'add-coupon.html',
})
export class AddCouponPage {
  addCouponForm: FormGroup;

  constructor(public viewCtrl: ViewController, public formBuilder: FormBuilder) {
  }

  ionViewWillLoad() {
    this.addCouponForm = this.formBuilder.group({
      name: new FormControl()
    });
  }

  addCoupon(value) {
    if(value.name !== '') {
      firebase.database().ref('coupons/').push({
        name: value.name
      });
    }
    this.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
