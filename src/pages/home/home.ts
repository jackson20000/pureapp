import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { DailyDealsPage } from '../daily-deals/daily-deals';
import { CategoryPage } from '../category/category';
import { ProfilePage } from '../profile/profile';
import { ItemDetailsPage } from '../item-details/item-details';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { SearchPage } from '../search/search';
import { DiscountDealsPage } from '../discount-deals/discount-deals';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  data: Observable<any>;
  dealproducts: any = [];
  category: any = [];
  items: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public http: HttpClient, private loadingCtrl: LoadingController) {
  }

  public profileGo() {
    this.navCtrl.setRoot(ProfilePage)

  }

  homeGo() {
    this.navCtrl.setRoot(HomePage)
  }

  cartGo() {
    this.navCtrl.setRoot("CartPage")
  }

  categoryGo() {
    this.navCtrl.push(CategoryPage)
  }

  public searchGo() {
    this.navCtrl.push(SearchPage, { items: this.dealproducts });
  }

  dailydealsGo() {
    this.navCtrl.push(DailyDealsPage)
  }

  discountdealsGo() {
    this.navCtrl.push(DiscountDealsPage)
  }



  public eachProduct(event, item) {
    this.navCtrl.push(ItemDetailsPage, { product: item });
  }

  //Search functionality


  ionViewDidLoad() {


    //*********** For listing items product id wise *********

    // For testing in chrome use HTTPClient

    // let loader = this.loadingCtrl.create({
    //   spinner: 'crescent',
    //   content: "Loading..",
    //   duration: 2000
    // });
    // loader.present();


    this.data = this.http.get('http://192.168.2.21:8069/newreach/product')
    this.data.subscribe(data => {
      this.dealproducts = data.products;
      console.log(this.dealproducts)

      var productNames = []
      for (var i of this.dealproducts) {
        productNames.push(i.productName);
      }
      this.items = productNames;
    });
    // loader.dismiss();



    //List all products

    // this.http.get('http://192.168.2.21:8069/newreach/product', {}, {})
    // .then(data => {

    // var json= data.data; // data received by server
    // let obj = JSON.parse(json);

    // this.dealproducts = obj.products;

    // var productNames = []
    //   for (var i of this.dealproducts) {
    //     productNames.push(i.productName);
    //   }
    //   this.items = productNames;

    // })
    // .catch(error => {

    // });



    //*********** For listing items category id wise *********

    this.data = this.http.get('http://192.168.2.21:8069/newreach/product')
    this.data.subscribe(data => {
      this.dealproducts = data.products;
      console.log(this.dealproducts)

      var productNames = []
      for (var i of this.dealproducts) {
        productNames.push(i.productName);
      }
      this.items = productNames;
    });

  }
}


