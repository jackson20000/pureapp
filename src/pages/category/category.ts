import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { CategoryListPage } from '../category-list/category-list';
import { HttpClient } from '@angular/common/http';
import { ProfilePage } from '../profile/profile';
import { LoginPage } from '../login/login';
import { SearchPage } from '../search/search';
import { Observable } from 'rxjs/Observable';
import { AuthProvider } from '../../providers/auth/auth';
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
  constructor(private authService: AuthProvider, public navCtrl: NavController, public navParams: NavParams, public http: HTTP,private loadingCtrl: LoadingController) {


    // For testing in chrome use HTTPClient


    //   this.data = this.http.get('http://198.199.67.147:8075/newreach/product/category')
    // this.data.subscribe(data => {
    //   this.category = data.category;   
    // });  
    
    
    // For testing in mobile use Ionic native HTTP
    let loader = this.loadingCtrl.create({
      spinner: 'crescent',
      content: "Loading..",
     
    });
    loader.present();

    this.http.get('http://198.199.67.147:8075/newreach/product/category', {}, {})
      .then(data => {

        var json = data.data; // data received by server
        let obj = JSON.parse(json);

        this.category = obj.category;
        loader.dismiss();
      })
      .catch(error => {
        loader.dismiss();

      });
  }


  public profileGo() {
    this.authService.isLoggedIn().then(val => {
      if(val== null){
        this.navCtrl.push(LoginPage)
      }else{
        this.navCtrl.push(ProfilePage)
      }
    });
  }

  cartGo() {
    this.navCtrl.setRoot("CartPage")
  }
  categoryProducts(item){
    this.categoryProductList = item.products;

    this.categoryName = item.name;
    this.navCtrl.push(CategoryListPage, { items: this.categoryProductList, name: this.categoryName} );
  }

  homeGo(){
    this.navCtrl.setRoot(HomePage)
  }

  public searchGo() {
    this.navCtrl.push(SearchPage, { items: this.dealproducts });
  }

  ionViewDidLoad() {  
    this.http.get('http://198.199.67.147:8075/newreach/product', {}, {})
    .then(data => {

    var json= data.data; // data received by server
    let obj = JSON.parse(json);

    this.dealproducts = obj.products;
      
    })
    .catch(error => {
    });
  }

}
