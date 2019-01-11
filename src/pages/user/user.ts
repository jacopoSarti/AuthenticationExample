import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { ModalController } from 'ionic-angular';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  public coupons = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseProvider: FirebaseProvider,
    public modalCtrl: ModalController
  ){}

  ionViewWillEnter(){
    
    this.getAllCoupons().then(() => {

    });
  }

  getAllCoupons(){
    
    return new Promise((resolve, reject) => {
      var dbRef = firebase.database().ref('coupons');
      dbRef.on('value', (coupons) => {
        
        var couponsArr = [];
        var couponObj = coupons.val();

        for(let coupon in couponObj){
          var couponObjTemp = {};
          
          couponObjTemp['id'] = coupon;
          couponObjTemp['name'] = couponObj[coupon].name;
          couponsArr.push(couponObjTemp);
        }
        this.coupons = couponsArr;
        resolve();
      });
    });
  }

  addCoupon(){
      const modal = this.modalCtrl.create('AddCouponPage');
      modal.present();
  }

  removeCoupon(id){
    this.firebaseProvider.removeCoupon(id);
  }

}