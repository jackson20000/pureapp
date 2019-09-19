import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { DailyDealsPage } from '../daily-deals/daily-deals';
import { CategoryPage } from '../category/category';
import { ProfilePage } from '../profile/profile';
import { ItemDetailsPage } from '../item-details/item-details';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';
import { SearchPage } from '../search/search';
import { CategoryListPage } from '../category-list/category-list';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { ApiDetailsProvider } from '../../providers/api-details/api-details';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { PublicDataProvider } from '../../providers/public-data/public-data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  data: Observable<any>;
  dealproducts: any = [];
  category: any = [];
  items: any = [];
  categoryProductList: any = [];
  categoryProductname: string;
  noNetwork: boolean = true;
  userDat: any;
  uid: number;
  usrname: string;
  pwd: string;
  profileInfo: any = [];
  datas: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public http: HTTP,
    private loadingCtrl: LoadingController,
    private apiData: ApiDetailsProvider,
    private storage: Storage,
    public alertCtrl: AlertController,
    public events: Events,
    public dataprov: PublicDataProvider
    ) {


    let usrDetails = {
      username: null, password: null, uid: null
    }

    this.storage.get('userData').then((val) => {
      usrDetails.uid = val.uid;
      this.auth.uid = usrDetails.uid;

      usrDetails.username = val.username;
      this.auth.usrname = usrDetails.username;

      usrDetails.password = val.password;
      this.auth.pwd = usrDetails.password;
    });

    this.storage.get('loginCheck').then((val) => {
      this.auth.check = val;
    });


    let loader = this.loadingCtrl.create({
      spinner: 'crescent',
      content: "Loading..",

    });
    loader.present();


    this.http.get(this.apiData.api + '/newreach/product', {}, {})
      .then(data => {

        var json = data.data; // data received by server
        let obj = JSON.parse(json);
        this.dealproducts = obj.products;

        var productNames = []
        for (var i of this.dealproducts) {
          productNames.push(i.productName);
        }
        this.items = productNames;
        this.noNetwork = true;

      })
      .catch(error => {

        this.noNetwork = false;

      });



    // *********** For listing items category id wise *********

    this.http.get(this.apiData.api + '/newreach/product/category', {}, {})
      .then(data => {

        var json = data.data; // data received by server
        let obj = JSON.parse(json);

        this.category = obj.category;
        loader.dismiss();
      })
      .catch(error => {
        loader.dismiss();
      });

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


  public eachProduct(event, item) {
    this.navCtrl.push(ItemDetailsPage, { product: item });
  }


  public eachCategory($event, item) {
    this.categoryProductList = item.products;
    this.categoryProductname = item.name;
    this.navCtrl.push(CategoryListPage, { items: this.categoryProductList, name: this.categoryProductname });
  }

  //Search functionality


  doRefresh(refresher) {
    this.http.get(this.apiData.api + '/newreach/product', {}, {})
      .then(data => {

        var json = data.data; // data received by server
        let obj = JSON.parse(json);
        this.dealproducts = obj.products;

        var productNames = []
        for (var i of this.dealproducts) {
          productNames.push(i.productName);
        }
        this.items = productNames;
        this.noNetwork = true;

      })
      .catch(error => {
        this.noNetwork = false;
      });

    this.http.get(this.apiData.api + '/newreach/product/category', {}, {})
      .then(data => {

        var json = data.data; // data received by server
        let obj = JSON.parse(json);

        this.category = obj.category;
        refresher.complete();

      })
      .catch(error => {
        refresher.complete();
      });

  }


}


