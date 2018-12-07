import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CategoryListPage } from '../category-list/category-list';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HTTP } from '@ionic-native/http';

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  data: Observable<any>;
  dealproducts: any = [];
  category: any[];
  categoryProductList: any = [];
categoryName: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HTTP) {


    // For testing in chrome use HTTPClient


    //   this.data = this.http.get('http://198.199.67.147:8075/newreach/product/category')
    // this.data.subscribe(data => {
    //   this.category = data.category;   
    // });  
    
    
    // For testing in mobile use Ionic native HTTP


    this.http.get('http://198.199.67.147:8075/newreach/product/category', {}, {})
      .then(data => {

        var json = data.data; // data received by server
        let obj = JSON.parse(json);

        this.category = obj.category;
      })
      .catch(error => {

      });
  }

  categoryProducts(item){
    this.categoryProductList = item.products;

    this.categoryName = item.name;
    this.navCtrl.push(CategoryListPage, { items: this.categoryProductList, name: this.categoryName} );
  }

  homeGo(){
    this.navCtrl.setRoot(HomePage)
  }

  ionViewDidLoad() {  
}

}
