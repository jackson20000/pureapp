import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ItemDetailsPage } from '../item-details/item-details';
import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { LoginPage } from '../login/login';
import { SearchPage } from '../search/search';
import { AuthProvider } from '../../providers/auth/auth';
import { HTTP } from '@ionic-native/http';

@IonicPage()
@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html',
})
export class CategoryListPage {
allItems: any = [];
name: string;
dealproducts: any = [];
  constructor(public http: HTTP,private authService: AuthProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  public eachProduct(event ,i ){
    this.navCtrl.push(ItemDetailsPage,{product:i});
    }
    homeGo() {
      this.navCtrl.setRoot(HomePage)
    }
  
    cartGo() {
      this.navCtrl.setRoot("CartPage")
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
  
    public searchGo() {
      this.navCtrl.push(SearchPage, { items: this.dealproducts });
    }

  ionViewDidLoad() {
    this.allItems = this.navParams.get("items");  
    this.name = this.navParams.get("name");  

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
