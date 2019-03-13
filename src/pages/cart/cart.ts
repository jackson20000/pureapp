import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from "ionic-angular";
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@ionic-native/http';
import { CartProvider } from "../../providers/cart/cart";
import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';
import { ProfilePage } from '../profile/profile';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ApiDetailsProvider } from '../../providers/api-details/api-details';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import 'rxjs/add/operator/map';

@IonicPage()
@Component({
  selector: "page-cart",
  templateUrl: "cart.html"
})

export class CartPage {
  cartItems: any[] = [];
  totalAmount: number = 0;
  totalCount: number = 0;
  isCartItemLoaded: boolean = false;
  isEmptyCart: boolean = true;
  temp: number = 0; 
  rootPage: any;

  dealproducts: any = [];
  data: Observable<any>;
  items: any = [];
  delivery: string;
  authForm : FormGroup;

  constructor(
    private auth: AuthProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    private cartService: CartProvider,
    private loadingCtrl: LoadingController,
    private http: HTTP,
    public storage: Storage,
    public alertCtrl: AlertController,
    private apiData: ApiDetailsProvider,
    private fb: FormBuilder
  ) {

    this.authForm = fb.group({     
      'delivery' : [null, Validators.compose([Validators.required])]      
		});
   
  }


  homeGo() {
    this.navCtrl.setRoot(HomePage)
  }


  public searchGo() {
    this.navCtrl.push(SearchPage, { items: this.items });
  }



  loadCartItems() {

    this.cartService
      .getCartItems()
      .then(val => {
        this.cartItems = val;
        if (this.cartItems.length > 0) {
          this.cartItems.forEach((v, indx) => {
            this.totalAmount += parseFloat(v.totalPrice);
            this.totalCount += parseFloat(v.count);
            console.log(this.totalCount);
          });
          this.isEmptyCart = false;
        }
        else {
          this.totalAmount = 0;
          this.isEmptyCart = true;
        }
        this.isCartItemLoaded = true;
      })
      .catch(err => { });
  }


  removeItem(itm) {

    this.cartService.removeFromCart(itm).then(() => {
      this.cartService
        .getCartItems()
        .then(val => {
          this.cartItems = val;
          if (this.cartItems.length > 0) {
            this.cartItems.forEach((i) => {
              this.totalAmount += parseInt(i.totalPrice);
              this.totalCount += parseFloat(i.count);
              console.log(this.totalCount);
              this.navCtrl.setRoot('CartPage');
            });
            this.isEmptyCart = false;
          }
          else {
            this.totalAmount = 0;
            this.isEmptyCart = true;
          }
          this.isCartItemLoaded = true;
        })
        .catch(err => { });
    });
  }


  checkOut(delivery) {     
    if (this.auth.uid == undefined || null || "") {
      const alerts = this.alertCtrl.create({
        title: 'Alert',
        subTitle: "Please Login",
        buttons: ['OK']
      });
      alerts.present();
      this.navCtrl.push(LoginPage)
    }
    else {

      let cartData = [];
      for (var i of this.cartItems) {
        cartData.push({ "product_id": i.product_id, "qty": i.count, "priceUnit": (i.totalPrice) / (i.count) });
      }      

      let data = {
        'db': this.apiData.db,
        'username': this.auth.usrname,
        'password': this.auth.pwd,
        'line': cartData,
        'delivery_type': delivery
      };

     
      let headers = {
        'Content-Type': 'application/json'
      };
      this.http.post(this.apiData.api + '/newreach/order/create', data, headers)
        .then((data) => {
          var resp = data.data;
          alert(resp)         
            const alerts = this.alertCtrl.create({
              title: 'Alert',
              subTitle: resp,
              buttons: ['OK']
            }); 
            this.isEmptyCart = true; 
            this.cartService.removeAllCartItems(); 
            this.navCtrl.setRoot(HomePage);
          })
          .catch(error =>{
            var resp = error;
            const alerts = this.alertCtrl.create({
              title: 'Alert',
              subTitle: resp,
              buttons: ['OK']
            });
            alerts.present();
          })
      
      
      
      }
  }

ionViewDidLoad() {

  this.loadCartItems();

  // For testing in chrome use HTTPClient



  // this.data = this.http.get('http://192.168.2.21:8069/newreach/product')
  // this.data.subscribe(data => {
  //   this.dealproducts = data.products;
  //   console.log(this.dealproducts)

  //   var productNames = []
  //   for (var i of this.dealproducts) {
  //     productNames.push(i.productName);
  //   }
  //   this.items = productNames;
  // });
  // loader.dismiss();

  this.http.get(this.apiData.api + '/newreach/product', {}, {})
    .then(data => {

      var json = data.data; // data received by server
      let obj = JSON.parse(json);

      this.dealproducts = obj.products;
      var productNames = [];
      for (var i of this.dealproducts) {
        productNames.push(i.productName);
      }
      this.items = productNames;
    })
    .catch(error => {

    });


}
}
