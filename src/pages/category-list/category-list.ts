import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemDetailsPage } from '../item-details/item-details';

@IonicPage()
@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html',
})
export class CategoryListPage {
allItems: any = [];
name: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public eachProduct(event ,i ){
    this.navCtrl.push(ItemDetailsPage,{product:i});
    }


  ionViewDidLoad() {
    this.allItems = this.navParams.get("items");  
    this.name = this.navParams.get("name");  

    console.log(this.name)
  }

}