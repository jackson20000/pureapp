import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, App } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CartProvider } from "../../providers/cart/cart";

@IonicPage()
@Component({
  selector: 'page-receipt',
  templateUrl: 'receipt.html',
})
export class ReceiptPage {

  orderDetails: any;
  orderDetails1: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
     private viewCtrl:ViewController, private app: App, private cartService: CartProvider,) {
 
     
  }

  public closeModal(){
    // this.viewCtrl.dismiss();
    // this.navCtrl.setRoot(HomePage)
    this.viewCtrl.dismiss().then(() => this.app.getRootNav().setRoot(HomePage));
}


  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceiptPage');
  }

}
