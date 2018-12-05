import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  data: Observable<any>;
  dealproducts: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  homeGo(){
    this.navCtrl.setRoot(HomePage)
  }

  ionViewDidLoad() {
    this.data = this.http.get('http://192.168.2.21:8069/newreach/product')
    this.data.subscribe(data => {
      this.dealproducts = data.products;
      console.log(this.dealproducts)   
    
    });
}

}
