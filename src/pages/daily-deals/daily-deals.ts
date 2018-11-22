import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ItemDetailsPage } from '../item-details/item-details';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-daily-deals',
  templateUrl: 'daily-deals.html',
})
export class DailyDealsPage {
  data: Observable<any>;
  dealproducts: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,  public http: HttpClient) {
  }


  public eachProduct(event ,item ){
    this.navCtrl.push(ItemDetailsPage,{product:item});
    }


    homeGo(){
      this.navCtrl.setRoot(HomePage)
    }

  ionViewDidLoad() {
   
    var url = 'http://198.199.67.147:8075/newreach/product';
  this.data = this.http.get(url);
  this.data.subscribe(data =>{
    this.dealproducts= data.products;
    console.log(this.dealproducts)
  })
  
  }
}
