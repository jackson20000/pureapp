import { Component } from '@angular/core';
import { IonicPage,  NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { HTTP } from '@ionic-native/http';
import { SearchPage } from '../search/search';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { AuthProvider } from '../../providers/auth/auth';
import { ApiDetailsProvider } from '../../providers/api-details/api-details';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the PendingPaymentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pending-payment',
  templateUrl: 'pending-payment.html',
})
export class PendingPaymentPage {

  dealproducts: any = [];
  orderhistory: any = [];
  items: any = [];
  cancel: boolean;
  success: boolean;
  pending: boolean;
  constructor(private auth: AuthProvider, public http: HTTP,
    public navCtrl: NavController, public navParams: NavParams,
    private apiData: ApiDetailsProvider, public storage: Storage,
    public alrtCtrl: AlertController, public loadingCtrl: LoadingController){


  let loader = this.loadingCtrl.create({
    spinner: 'crescent',
    content: "Loading..",

  });
  loader.present();

  let data = {
    'db': this.apiData.db,
    'username': this.auth.usrname,
    'password': this.auth.pwd,
  };


  let headers = {
    'Content-Type': 'application/json'
  };

  this.http.post(this.apiData.api + '/newreach/pending_payments', data, headers)
    .then((data) => {
      var resp = data.data;
      let obj = JSON.parse(resp);
      let temp = obj.history;
      this.orderhistory = temp.filter((item)=> item.delivery_status == 2);
      // this.orderhistory.forEach(element => {
      //   if(element == 0){
      //     this.cancel = true;
      //   }
      //   else if(element == 1){
      //     this.success = true;
      //   }
      //   else if(element == 2){
      //     this.pending = true;
      //   }
      // });
      loader.dismiss();
    })
    .catch(error => {
      console.log(error);
      loader.dismiss();
    })

    this.http.get(this.apiData.api + '/newreach/product', {}, {})
    .then(data => {

      var json = data.data;
      let obj = JSON.parse(json);

      this.dealproducts = obj.products;

    })
    .catch(error => {
      console.log(error);
    });
}

doRefresh(refresher) {
  let data = {
    'db': this.apiData.db,
    'username': this.auth.usrname,
    'password': this.auth.pwd,
  };


  let headers = {
    'Content-Type': 'application/json'
  };
  this.http.post(this.apiData.api + '/newreach/history', data, headers)
    .then((data) => {
      var resp = data.data;
      let obj = JSON.parse(resp);
      this.orderhistory = obj.history;
      refresher.complete();
    })
    .catch(error => {
      console.log(error);
      refresher.complete();
    })

}
  cartGo() {
    this.navCtrl.setRoot("CartPage")
  }

  homeGo() {
    this.navCtrl.setRoot(HomePage)
  }

  public searchGo() {
    this.navCtrl.push(SearchPage, { items: this.dealproducts });
  }

}
