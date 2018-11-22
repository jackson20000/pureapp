import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { DailyDealsPage } from '../daily-deals/daily-deals';
import { CategoryPage } from '../category/category';
import { ProfilePage } from '../profile/profile';
import { ItemDetailsPage } from '../item-details/item-details';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  data: Observable<any>;
  dealproducts: any = [];

  constructor(public navCtrl: NavController,  public navParams: NavParams,  public http: HttpClient) {

  }

  profileGo(){
    this.navCtrl.push(ProfilePage)
  }

homeGo(){
    this.navCtrl.setRoot(HomePage)
  }

  categoryGo(){
    this.navCtrl.push(CategoryPage)
  }

  dailydealsGo(){
    this.navCtrl.push(DailyDealsPage)
  }

  
  public eachProduct(event ,item ){
    this.navCtrl.push(ItemDetailsPage,{product:item});
    }

  ionViewDidLoad() {
    this.data = this.http.get('http://198.199.67.147:8075/newreach/product')
    this.data.subscribe(data => {
      this.dealproducts = data.products;
      console.log(this.dealproducts)
    });  

    
  }  


//   var json = '{"products":[{"productName":"HASH OIL", "unitPrice": 1.0, "image":false}, {"productName":"Jayuana","unitPrice":41.0,"image":false},{"productName":"MariJayuana","unitPrice":13.0,"image":false}]}',
//     obj = JSON.parse(json);

// console.log(obj.products[0].productName);


  // this.http.get('http://198.199.67.147:8075/newreach/product', {}, {})
  // .then(data => {

  // var json= data.data; // data received by server
  // let obj = JSON.parse(json);

  // this.dealproducts = obj.products;
  // })
  // .catch(error => {

  //   alert(error.status);
  //   alert(error.error); // error message as string
  //   alert(error.headers);

  // });
  }


