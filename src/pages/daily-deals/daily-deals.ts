import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


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

  ionViewDidLoad() {
   
    var url = 'http://198.199.67.147:8075/newreach/product';
  this.data = this.http.get(url);
  this.data.subscribe(data =>{
    this.dealproducts= data.products;
    console.log(this.dealproducts)
  })
  
  }
}
