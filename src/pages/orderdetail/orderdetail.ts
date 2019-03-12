import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { HTTP } from '@ionic-native/http';
import { AuthProvider } from '../../providers/auth/auth';
import { ApiDetailsProvider } from '../../providers/api-details/api-details';


@IonicPage()
@Component({
  selector: 'page-orderdetail',
  templateUrl: 'orderdetail.html',
})
export class OrderdetailPage {
  dealproducts: any = [];
  constructor(private authService: AuthProvider,public http:HTTP, public navCtrl: NavController,
     public navParams: NavParams, private apiData:ApiDetailsProvider) {
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

 

  ionViewDidLoad() {
    this.http.get(this.apiData.api+'/newreach/product', {}, {})
    .then(data => {

    var json= data.data; // data received by server
    let obj = JSON.parse(json);

    this.dealproducts = obj.products;
      
    })
    .catch(error => {
    });
  }

}
