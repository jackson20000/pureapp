import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ItemDetailsPage } from '../item-details/item-details';



@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  terms;
  items;
  data: Observable<any>;
  allproducts: any = [];
  allproductsList: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
       
    this.initializeItems();

  }
  initializeItems() {
    this.allproductsList = this.navParams.get("items");  
  }  
  
  public productShow(event, item) {
    this.navCtrl.push(ItemDetailsPage, { product: item });
  }
}