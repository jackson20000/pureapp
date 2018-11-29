import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  items;
  data: Observable<any>;
  allproducts: any = [];
  allproductsList: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
       
    this.initializeItems();

  }
  initializeItems() {
    this.allproductsList = this.navParams.get("items");  
    var productNames = []
    for (var i of this.allproductsList) {
      productNames.push(i.productName);
    }
    this.items = productNames;
  }  
 
  getItems(ev) {

    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != "") {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  

}
