import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { DailyDealsPage } from '../daily-deals/daily-deals'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  data: Observable<any>;
  dealproducts: any = [];


  constructor(public navCtrl: NavController, public http: HttpClient) {

  }

  categoryGo(){
  }

  dailydealsGo(){
    this.navCtrl.push(DailyDealsPage)
  }

  ionViewDidLoad() {
   
    var url = 'http://192.168.0.23:8066/newreach/product';
  this.data = this.http.get(url);
  this.data.subscribe(data =>{
    this.dealproducts= data.products;
    console.log(this.dealproducts)
  })
  
  }
  
}
