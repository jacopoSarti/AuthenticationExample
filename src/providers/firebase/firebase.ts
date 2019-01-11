import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  constructor(public db: AngularFireDatabase) {
    
  }
  
  getCouponsList(couponsList: any[]){
    return this.db.list('/coupons/')
    .valueChanges()
    .subscribe(list => {
      couponsList = list;
    });
  }

  addCoupon(name){
    this.db.list('/coupons/').push(name);
  }

  removeCoupon(id){
    this.db.list('/coupons/').remove(id);
  }

}
