import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { HTTP } from '@ionic-native/http';
import { SearchPage } from '../search/search';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { AuthProvider } from '../../providers/auth/auth';


@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  dealproducts: any = [];
  constructor(private authService: AuthProvider,public http: HTTP,public navCtrl: NavController, public navParams: NavParams) {
  }

  cartGo() {
    this.navCtrl.setRoot("CartPage")
  }

  homeGo(){
    this.navCtrl.setRoot(HomePage)
  }

  public searchGo() {
    this.navCtrl.push(SearchPage, { items: this.dealproducts });
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
