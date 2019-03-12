import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CategoryListPage } from '../category-list/category-list';
import { HttpClient } from '@angular/common/http';
import { ProfilePage } from '../profile/profile';
import { LoginPage } from '../login/login';
import { SearchPage } from '../search/search';
import { Observable } from 'rxjs/Observable';
import { AuthProvider } from '../../providers/auth/auth';
import { HTTP } from '@ionic-native/http';
import { ApiDetailsProvider } from '../../providers/api-details/api-details';

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
  constructor(private authService: AuthProvider,
    public navCtrl: NavController, public navParams: NavParams,
    public http: HTTP, private loadingCtrl: LoadingController,
    private apiData: ApiDetailsProvider, private alertCtrl: AlertController) {

    // Category Items

    let loader = this.loadingCtrl.create({
      spinner: 'crescent',
      content: "Loading..",

    });
    loader.present();

    this.http.get(this.apiData.api + '/newreach/product/category', {}, {})
      .then(data => {
        var json = data.data;
        let obj = JSON.parse(json);
        this.category = obj.category;
        loader.dismiss();
      })
      .catch(error => {
        console.log(error);
        loader.dismiss();
      });


    // All Products

    this.http.get(this.apiData.api + '/newreach/product', {}, {})
      .then(data => {

        var json = data.data;
        let obj = JSON.parse(json);

        this.dealproducts = obj.products;

      })
      .catch(error => {
        console.log(error);
      });
  }

  cartGo() {
    this.navCtrl.setRoot("CartPage")
  }
  categoryProducts(item) {
    this.categoryProductList = item.products;

    this.categoryName = item.name;
    this.navCtrl.push(CategoryListPage, { items: this.categoryProductList, name: this.categoryName });
  }

  homeGo() {
    this.navCtrl.setRoot(HomePage)
  }

  public searchGo() {
    this.navCtrl.push(SearchPage, { items: this.dealproducts });
  }

}
